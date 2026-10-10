"""Tests for command approval, tenancy guards and verified outcomes."""
import unittest
from command_engine import Command, ExecutionStatus


class CommandEngineTests(unittest.TestCase):
    def make(self, intent="diagnose_business"):
        return Command("tenant-a", "user-a", intent, "Help my business", "request-001")

    def test_safe_plan(self):
        c = self.make()
        c.prepare()
        self.assertEqual(c.status, ExecutionStatus.APPROVED)
        self.assertIn("business_scraper", c.employees)

    def test_sensitive_action_requires_approval(self):
        c = self.make("transfer_funds")
        c.prepare()
        self.assertEqual(c.status, ExecutionStatus.AWAITING_APPROVAL)
        with self.assertRaises(ValueError):
            c.start(authenticated=True, tenant_authorized=True)
        with self.assertRaises(PermissionError):
            c.approve("user-a", authorized=False)
        c.approve("admin", authorized=True)
        with self.assertRaises(PermissionError):
            c.start(authenticated=True, tenant_authorized=False)
        c.start(authenticated=True, tenant_authorized=True)
        with self.assertRaises(ValueError):
            c.finish("sent", verified=False)
        c.finish("provider-confirmed", verified=True)
        self.assertEqual(c.status, ExecutionStatus.COMPLETED)

    def test_no_duplicate_preparation(self):
        c = self.make()
        c.prepare()
        with self.assertRaises(ValueError):
            c.prepare()

    def test_missing_identity_rejected(self):
        with self.assertRaises(ValueError):
            Command("", "user", "diagnose_business", "test", "key")


if __name__ == "__main__":
    unittest.main()
