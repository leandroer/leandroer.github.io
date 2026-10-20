import copy
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

def module(name, filename):
    spec = importlib.util.spec_from_file_location(name, Path(__file__).with_name(filename))
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result

prepare = module('prepare', 'prepare-publication.py')
verify = module('verify', 'verify-deployment.py')

class PublicationTests(unittest.TestCase):
    def test_overdue_and_future_partition(self):
        due, future = prepare.approved_due(today='2026-10-01')
        self.assertEqual([a['slug'] for a in due], ['when-your-ai-evidence-cannot-be-trusted'])
        self.assertEqual([a['slug'] for a in future], ['poisoned-rag-pipelines'])
        self.assertEqual(len(prepare.approved_due(today='2027-01-01')[0]), 2)

    def test_changed_source_or_missing_approval_fails_closed(self):
        original = json.loads((prepare.ROOT / 'publishing/approved.json').read_text())
        for mode in ['changed source', 'missing approval']:
            with self.subTest(mode=mode), tempfile.TemporaryDirectory() as directory:
                root = Path(directory)
                manifest = copy.deepcopy(original)
                for article in manifest['articles']:
                    source = root / article['source']
                    source.parent.mkdir(parents=True)
                    source.write_bytes((prepare.ROOT / article['source']).read_bytes())
                if mode == 'changed source':
                    (root / manifest['articles'][0]['source']).write_text('tampered')
                else:
                    manifest['articles'][0]['approval'] = {}
                (root / 'publishing').mkdir()
                (root / 'publishing/approved.json').write_text(json.dumps(manifest))
                with self.assertRaises(ValueError):
                    prepare.approved_due(root=root, today='2027-01-01')

    def test_stale_deployment_rejected(self):
        with patch.object(verify, 'fetch', return_value='{"commit":"old"}'):
            with self.assertRaisesRegex(RuntimeError, 'does not match'):
                verify.verify('new')

    def test_live_missing_diagram_or_index_or_home_rejected(self):
        release = {'commit':'new','articles':[{'path':'/articles/test/','title':'Test article'}]}
        valid = {'/release.json':json.dumps(release),'/':'/articles/test/','/articles/':'/articles/test/','/articles/test/':'<h1>Test article</h1><figure class="approved-architecture"></figure>'}
        for path in ['/','/articles/','/articles/test/']:
            pages = dict(valid)
            pages[path] = 'missing'
            with self.subTest(path=path), patch.object(verify, 'fetch', side_effect=lambda path, commit:pages[path]):
                with self.assertRaises(RuntimeError):
                    verify.verify('new', expected=release['articles'])
        with patch.object(verify, 'fetch', side_effect=lambda path, commit:valid[path]):
            self.assertEqual(verify.verify('new', expected=release['articles'])['commit'], 'new')

if __name__ == '__main__':
    unittest.main()
