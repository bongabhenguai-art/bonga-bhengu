import tempfile, unittest
from pathlib import Path
from business_master import BusinessRecord, save_profile
from site_pipeline import generate_from_master

class PipelineTests(unittest.TestCase):
    def test_generate_from_approved_profile(self):
        with tempfile.TemporaryDirectory() as d:
            db=str(Path(d)/"master.sqlite3")
            save_profile(db,BusinessRecord("client-1","Client Fashion","Clothing studio",["Design"],approved=True))
            result=generate_from_master(db,"client-1",Path(d)/"sites")
            self.assertTrue(result.exists())
            self.assertIn("Client Fashion",result.read_text())
    def test_reject_unapproved_profile(self):
        with tempfile.TemporaryDirectory() as d:
            db=str(Path(d)/"master.sqlite3")
            save_profile(db,BusinessRecord("client-1","Client","",[]))
            with self.assertRaises(PermissionError):
                generate_from_master(db,"client-1",Path(d)/"sites")

if __name__=="__main__":
    unittest.main()
