import json
from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]


class ArticleUsabilityTests(unittest.TestCase):
    def setUp(self):
        self.catalog = json.loads((ROOT / "publishing/catalog.json").read_text())

    def test_every_article_has_incident_panel_navigation_and_verification_date(self):
        for article in self.catalog:
            slug = article["href"].strip("/").split("/")[-1]
            source = (ROOT / f"app/articles/{slug}/page.tsx").read_text()
            with self.subTest(slug=slug):
                self.assertTrue(article["verifiedDate"])
                self.assertIn(f'<IncidentPanel slug="{slug}"', source)
                self.assertIn(f'<ArticleNavigation slug="{slug}"', source)
                self.assertRegex(source, re.compile(r'<h2 id=(?:"|\\")'))

    def test_catalog_supports_all_requested_filters(self):
        for article in self.catalog:
            with self.subTest(href=article["href"]):
                for field in ("scenarios", "technologies", "phases", "artifactTypes"):
                    self.assertIsInstance(article[field], list)
                    self.assertGreater(len(article[field]), 0)

    def test_homepage_is_driven_by_latest_published_article(self):
        source = (ROOT / "app/page.tsx").read_text()
        self.assertIn("publishedArticles()[0]", source)
        self.assertIn("latest.verifiedDate", source)
        self.assertIn("latest.date", source)
        self.assertIn("latest.scenarios[0]", source)

    def test_explorer_exposes_requested_controls(self):
        source = (ROOT / "app/components/ArticleExplorer.tsx").read_text()
        for label in ("Search", "Scenario", "Technology", "Response phase", "Artifact type"):
            self.assertIn(label, source)


if __name__ == "__main__":
    unittest.main()
