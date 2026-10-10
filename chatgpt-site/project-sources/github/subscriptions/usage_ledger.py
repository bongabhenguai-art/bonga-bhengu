"""SQLite-backed atomic usage reservations for trusted backend calls only.

This module does not authenticate users or verify payment status.
"""
import sqlite3
import uuid
from datetime import datetime, timezone
from contextlib import contextmanager
from access import Principal, authorize
from catalog import Subscription
from limits import RESOURCE_PRODUCT

SCHEMA = """
CREATE TABLE IF NOT EXISTS usage_reservations (
  id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, resource TEXT NOT NULL,
  billing_cycle TEXT NOT NULL, units INTEGER NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('reserved','settled','released')),
  idempotency_key TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE(tenant_id, resource, billing_cycle, idempotency_key)
);
"""

def initialize(conn):
    conn.execute(SCHEMA)
    conn.commit()

def reserve(conn, principal: Principal, subscription: Subscription, resource: str,
            billing_cycle: str, idempotency_key: str, units: int = 1):
    if resource not in RESOURCE_PRODUCT:
        raise ValueError("Unsupported metered resource")
    if not billing_cycle or not idempotency_key or units < 1:
        raise ValueError("Billing cycle, idempotency key and positive units required")
    # A trusted backend must resolve billing_cycle from verified subscription dates.
    conn.execute("BEGIN IMMEDIATE")
    try:
        existing = conn.execute(
            "SELECT id,status,units FROM usage_reservations WHERE tenant_id=? AND resource=? AND billing_cycle=? AND idempotency_key=?",
            (subscription.tenant_id,resource,billing_cycle,idempotency_key)).fetchone()
        if existing:
            if existing[2] != units:
                raise ValueError("Idempotency key reused with different units")
            # Still require membership, active subscription and product entitlement.
            decision = authorize(principal, subscription, RESOURCE_PRODUCT[resource], resource, 0)
            if not decision["allowed"]:
                raise PermissionError(decision["reason"])
            conn.commit()
            return {"id":existing[0],"status":existing[1],"replayed":True}
        used = conn.execute(
            "SELECT COALESCE(SUM(units),0) FROM usage_reservations WHERE tenant_id=? AND resource=? AND billing_cycle=? AND status IN ('reserved','settled')",
            (subscription.tenant_id,resource,billing_cycle)).fetchone()[0]
        decision = authorize(principal,subscription,RESOURCE_PRODUCT[resource],resource,used)
        if not decision["allowed"] or decision["remaining"] < units:
            raise PermissionError(decision["reason"] if not decision["allowed"] else "limit_reached")
        reservation_id = str(uuid.uuid4())
        conn.execute("INSERT INTO usage_reservations VALUES (?,?,?,?,?,?,?,?)",
                     (reservation_id,subscription.tenant_id,resource,billing_cycle,units,"reserved",
                      idempotency_key,datetime.now(timezone.utc).isoformat()))
        conn.commit()
        return {"id":reservation_id,"status":"reserved","replayed":False}
    except Exception:
        conn.rollback()
        raise

def finalize(conn, reservation_id: str, tenant_id: str, success: bool):
    # Caller must verify tenant membership before calling.
    conn.execute("BEGIN IMMEDIATE")
    try:
        row=conn.execute("SELECT status FROM usage_reservations WHERE id=? AND tenant_id=?",
                         (reservation_id,tenant_id)).fetchone()
        if row is None:
            raise LookupError("Reservation not found")
        if row[0] == "reserved":
            conn.execute("UPDATE usage_reservations SET status=? WHERE id=? AND tenant_id=?",
                         ("settled" if success else "released",reservation_id,tenant_id))
        conn.commit()
        return conn.execute("SELECT status FROM usage_reservations WHERE id=? AND tenant_id=?",
                            (reservation_id,tenant_id)).fetchone()[0]
    except Exception:
        conn.rollback()
        raise
