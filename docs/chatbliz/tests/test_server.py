"""Run: python3 -m unittest discover -s tests -v (from docs/chatbliz)."""
import os
import tempfile
import unittest
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import server

class TaskTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = server.DB
        server.DB = Path(self.tmp.name) / "test.sqlite3"

    def tearDown(self):
        server.DB = self.old_db
        self.tmp.cleanup()

    def test_create_and_list(self):
        task = server.create_task("My Business", "Qualify leads")
        self.assertEqual(task["status"], "queued_for_review")
        self.assertEqual(server.list_tasks()[0]["id"], task["id"])

    def test_reject_unknown_service(self):
        with self.assertRaises(ValueError):
            server.create_task("Fake Service", "hello")

    def test_reject_blank_and_oversized(self):
        for text in (" ", "x" * 5001):
            with self.subTest(text_length=len(text)):
                with self.assertRaises(ValueError):
                    server.create_task("My Brand", text)

    def test_task_count(self):
        for i in range(110):
            server.create_task("My Content", "Brief " + str(i))
        self.assertEqual(len(server.list_tasks()), 100)

if __name__ == "__main__":
    unittest.main()
