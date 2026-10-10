import unittest
import tempfile
from pathlib import Path
from builder import BusinessProfile, build_site

class BuilderTests(unittest.TestCase):
    def test_requires_approval(self):
        with tempfile.TemporaryDirectory() as d:
            with self.assertRaises(PermissionError):
                build_site(BusinessProfile("client-1","Test","Desc",["Design"]),Path(d))

    def test_tenant_output_and_escaping(self):
        with tempfile.TemporaryDirectory() as d:
            p = BusinessProfile("client-1","Brand <One>","Beautiful sites",["<script>alert(1)</script>"],approved=True)
            result = build_site(p,Path(d))
            html = result.read_text()
            self.assertIn("Brand &lt;One&gt;",html)
            self.assertNotIn("<script>",html)
            self.assertIn("client-1",str(result))

if __name__ == "__main__":
    unittest.main()
