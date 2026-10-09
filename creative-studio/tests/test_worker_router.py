import unittest
from worker_router import Worker, choose_worker, DEFAULT_WORKERS

class RouterTests(unittest.TestCase):
    def test_local_banner(self):
        self.assertEqual(choose_worker("banner", DEFAULT_WORKERS), "local-banner")

    def test_no_fake_cloud_fallback(self):
        with self.assertRaises(LookupError):
            choose_worker("video", DEFAULT_WORKERS)

    def test_paid_requires_consent(self):
        workers = [Worker("paid-provider", frozenset({"video"}), True, True)]
        with self.assertRaises(LookupError):
            choose_worker("video", workers)
        self.assertEqual(choose_worker("video", workers, allow_paid=True), "paid-provider")

if __name__ == "__main__":
    unittest.main()
