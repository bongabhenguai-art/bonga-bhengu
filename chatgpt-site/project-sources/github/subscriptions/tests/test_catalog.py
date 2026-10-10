import unittest
from catalog import PRODUCTS, PACKAGES, Subscription, validate_selection, can_use, price_ready

class SubscriptionTests(unittest.TestCase):
    def test_four_products_four_packages(self):
        self.assertEqual(len(PRODUCTS),4)
        self.assertEqual([p["product_count"] for p in PACKAGES.values()],[1,2,3,4])
    def test_one_and_two_prices(self):
        self.assertEqual(PACKAGES["choose_one"]["monthly_zar"],299)
        self.assertEqual(PACKAGES["choose_two"]["monthly_zar"],499)
    def test_pending_is_not_access(self):
        s=Subscription("client","choose_one",("digital_banner",))
        self.assertFalse(can_use(s,"digital_banner"))
    def test_active_selection(self):
        s=Subscription("client","choose_two",("digital_banner","creative_studio"),"active")
        self.assertTrue(can_use(s,"creative_studio"))
        self.assertFalse(can_use(s,"digital_visibility"))
    def test_no_unapproved_prices(self):
        self.assertTrue(price_ready("choose_three"))
        self.assertTrue(price_ready("all_in_one"))
        self.assertEqual(PACKAGES["choose_three"]["monthly_zar"],699)
        self.assertEqual(PACKAGES["all_in_one"]["monthly_zar"],1000)
    def test_four_required_for_all(self):
        with self.assertRaises(ValueError):
            validate_selection(Subscription("client","all_in_one",("creative_studio",)))

if __name__=="__main__":
    unittest.main()
