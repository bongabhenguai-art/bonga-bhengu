import tempfile, unittest
from pathlib import Path
from business_master import BusinessRecord, save_profile, get_profile

class BusinessMasterTests(unittest.TestCase):
    def test_isolated_business_profiles(self):
        with tempfile.TemporaryDirectory() as d:
            db=str(Path(d)/"profiles.sqlite3")
            save_profile(db,BusinessRecord("agency","Bonga Bhengu","Agency",["Design"],approved=True))
            save_profile(db,BusinessRecord("customer-1","Client","Retail",["Clothing"]))
            self.assertEqual(get_profile(db,"agency").name,"Bonga Bhengu")
            self.assertEqual(get_profile(db,"customer-1").name,"Client")
            self.assertIsNone(get_profile(db,"customer-2"))
    def test_evidence_validation(self):
        with tempfile.TemporaryDirectory() as d:
            with self.assertRaises(ValueError):
                save_profile(str(Path(d)/"profiles.sqlite3"),
                    BusinessRecord("client","Client","",[],evidence_links=["javascript:alert(1)"]))

if __name__=="__main__":
    unittest.main()
