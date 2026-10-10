import unittest
from catalog import Subscription
from limits import LIMITS, allowance, remaining

class LimitTests(unittest.TestCase):
    def test_proposed_package_limits(self):
        self.assertEqual(LIMITS["choose_one"]["creative_jobs"],10)
        self.assertEqual(LIMITS["all_in_one"]["banners"],40)
    def test_unselected_product_has_no_allowance(self):
        s=Subscription("tenant-1","choose_two",("website_builder_hosting","digital_visibility"),"active")
        self.assertEqual(allowance(s,"creative_jobs"),0)
        self.assertEqual(allowance(s,"visibility_scans"),5)
    def test_pending_subscription_has_no_allowance(self):
        s=Subscription("tenant-1","choose_one",("creative_studio",))
        self.assertEqual(allowance(s,"creative_jobs"),0)
    def test_remaining_never_negative(self):
        s=Subscription("tenant-1","choose_one",("digital_banner",),"active")
        self.assertEqual(remaining(s,"banners",7),0)

if __name__=="__main__":
    unittest.main()
