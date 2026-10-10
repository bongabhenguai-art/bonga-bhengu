import sqlite3
import unittest
from access import Principal
from catalog import Subscription
from usage_ledger import initialize, reserve, finalize

class UsageLedgerTests(unittest.TestCase):
    def setUp(self):
        self.db=sqlite3.connect(":memory:",isolation_level=None)
        initialize(self.db)
        self.principal=Principal("user",frozenset({"tenant"}))
        self.sub=Subscription("tenant","choose_one",("digital_banner",),"active")
    def tearDown(self):
        self.db.close()
    def test_idempotency_and_release(self):
        first=reserve(self.db,self.principal,self.sub,"banners","2026-10","job-1",2)
        again=reserve(self.db,self.principal,self.sub,"banners","2026-10","job-1",2)
        self.assertEqual(first["id"],again["id"])
        self.assertTrue(again["replayed"])
        self.assertEqual(finalize(self.db,first["id"],"tenant",False),"released")
        self.assertEqual(finalize(self.db,first["id"],"tenant",False),"released")
    def test_reject_other_tenant(self):
        with self.assertRaises(PermissionError):
            reserve(self.db,Principal("other",frozenset({"other"})),self.sub,"banners","2026-10","job-2")
    def test_limit(self):
        reserve(self.db,self.principal,self.sub,"banners","2026-10","job-1",5)
        with self.assertRaises(PermissionError):
            reserve(self.db,self.principal,self.sub,"banners","2026-10","job-2")
    def test_replay_changed_units(self):
        reserve(self.db,self.principal,self.sub,"banners","2026-10","job-1",1)
        with self.assertRaises(ValueError):
            reserve(self.db,self.principal,self.sub,"banners","2026-10","job-1",2)

if __name__=="__main__":
    unittest.main()
