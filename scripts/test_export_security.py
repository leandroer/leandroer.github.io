import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('harden', Path(__file__).with_name('harden-export.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class ExportSecurityTests(unittest.TestCase):
    def test_exact_bootstrap_hashes_and_charset(self):
        source = '<html><head><meta charset="utf-8"><script>const x = "é";</script><script src="/_next/a.js"></script></head><body></body></html>'
        result = module.harden(source)
        self.assertIn(module.digest('const x = "é";').replace("'", '&#x27;'), result)
        self.assertLess(result.index('charset'), result.index('Content-Security-Policy'))
        self.assertNotIn('unsafe-inline', result)
        self.assertNotIn('unsafe-eval', result)

    def test_external_scripts_and_handlers_are_rejected(self):
        for body in ['<script src="https://evil.example/x.js"></script>', '<button onclick="alert(1)">x</button>', '<script src="data:text/javascript,alert(1)"></script>']:
            with self.subTest(body=body), self.assertRaises(ValueError):
                module.harden('<html><head></head><body>'+body+'</body></html>')

    def test_inline_style_attributes_are_exact_hashes(self):
        result = module.harden('<html><head></head><body><div style="display:none"></div></body></html>')
        self.assertIn(module.digest('display:none').replace("'", '&#x27;'), result)
        self.assertIn('style-src-attr', result)

if __name__ == '__main__':
    unittest.main()
