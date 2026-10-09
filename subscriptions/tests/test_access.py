import unittest
from access import Principal, authorize
from catalog import Subscription

class AccessTests(unittest.TestCase):
    def setUp(self):
        self.sub=Subscription("tenant-a","choose_two",("creative_studio","digital_banner"),"active")
        self.member=Principal("user-1",frozenset({"tenant-a"}))
    def test_member_can_use_selected_product(self):
        result=authorize(self.member,self.sub,"creative_studio","creative_jobs",0)
        self.assertTrue(result["allowed"])
    def test_other_tenant_rejected(self):
        with self.assertRaises(PermissionError):
            authorize(Principal("other",frozenset({"tenant-b"})),self.sub,"creative_studio","creative_jobs")
    def test_unselected_product_rejected(self):
        result=authorize(self.member,self.sub,"digital_visibility","visibility_scans")
        self.assertEqual(result["reason"],"product_not_selected")
    def test_limit_reached(self):
        result=authorize(self.member,self.sub,"digital_banner","banners",10)
        self.assertEqual(result["reason"],"limit_reached")

if __name__=="__main__":
    unittest.main()
