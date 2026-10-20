# Approved publication pipeline

`approved.json` is the durable queue of prepared, explicitly approved releases.
Each entry binds its approval record to the SHA-256 of the reviewed article
source. Preserve old entries when adding new ones. Drafts and full approval
responses are retained in the private `leandroer/lrinfosec-operations` repository.

`catalog.json` drives both the article index and homepage latest feature. Dates
use America/New_York. Scheduled publication uses `date <= today`, so an outage
does not lose a release. Only explicitly approved content may be staged here;
unapproved drafts belong in the private repository.

The Pages workflow validates source hashes, runs regression tests and the
production dependency audit, prepares due routes, builds, and checks links.
It retries daily, as well as on main pushes and manual dispatch. Future approved
article directories are removed only from the disposable build checkout so
Next.js cannot export them early. Run `--prepare` in CI or an isolated checkout;
do not commit those temporary deletions. The article catalog filters the same
future dates independently.

After Pages deployment, live checks require `/release.json` to match the exact
workflow commit and require every due article's title, architecture diagram,
index link, and the latest homepage link. CDN propagation has bounded retries.
A stale or incomplete release fails verification. Failed releases remain in the
queue and retry on the next scheduled run without weakening any gate.

Successful live verification is reconciled into the private operations ledger,
which records attempts, failures, backoff, deployed commit, and verification.
An interrupted task verifies the existing release first to avoid duplicate work.
Daily builds do not create articles or authorize new editorial content.

Local validation:

```sh
python3 -m unittest discover -s scripts -p test_publication.py
python3 scripts/prepare-publication.py
pnpm audit --prod
python3 scripts/prepare-publication.py --prepare
pnpm build
pnpm check:links
python3 scripts/verify-deployment.py --commit <deployed-commit>
```
