import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from datetime import datetime

def module(name, filename):
    spec = importlib.util.spec_from_file_location(name, Path(__file__).with_name(filename))
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result

prepare = module('prepare', 'prepare-publication.py')
verify = module('verify', 'verify-deployment.py')

class PublicationTests(unittest.TestCase):
    def test_overdue_and_future_partition(self):
        # Synthetic dates keep the test stable as new approved articles are added.
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            records = []
            for slug, date in [('overdue', '2026-09-11'), ('future', '2026-10-16')]:
                source = root / f'app/articles/{slug}/page.tsx'
                source.parent.mkdir(parents=True)
                source.write_text('approved content')
                records.append({'slug':slug, 'date':date, 'source':source.relative_to(root).as_posix(), 'path':f'/articles/{slug}/', 'approval':{'turnId':'explicit-approval'}, 'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest()})
            (root / 'publishing').mkdir()
            (root / 'publishing/approved.json').write_text(json.dumps({'articles':records}))
            due, future = prepare.approved_due(root=root, today='2026-10-01')
            self.assertEqual([a['slug'] for a in due], ['overdue'])
            self.assertEqual([a['slug'] for a in future], ['future'])
            self.assertEqual(len(prepare.approved_due(root=root, today='2027-01-01')[0]), 2)

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

    def test_exact_publication_timestamp_blocks_early_release(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / 'app/articles/timed/page.tsx'
            source.parent.mkdir(parents=True)
            source.write_text('approved content')
            article = {
                'slug':'timed', 'date':'2026-11-13', 'publishAt':'2026-11-13T09:00:00-05:00',
                'source':source.relative_to(root).as_posix(), 'path':'/articles/timed/',
                'approval':{'turnId':'explicit-approval'},
                'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),
            }
            (root / 'publishing').mkdir()
            (root / 'publishing/approved.json').write_text(json.dumps({'articles':[article]}))
            before = datetime.fromisoformat('2026-11-13T08:59:59-05:00')
            on_time = datetime.fromisoformat('2026-11-13T09:00:00-05:00')
            self.assertEqual(prepare.approved_due(root=root, now=before)[1][0]['slug'], 'timed')
            self.assertEqual(prepare.approved_due(root=root, now=on_time)[0][0]['slug'], 'timed')

    def test_missing_approved_article_rejected(self):
        with patch.object(verify, 'fetch', return_value='{"commit":"new","articles":[]}'):
            with self.assertRaisesRegex(RuntimeError, 'exact due approved article set'):
                verify.verify('new', expected=[{'path':'/articles/expected/'}])

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
