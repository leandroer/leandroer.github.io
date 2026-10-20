export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { publishedArticles } from "./lib/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "articles/", "resources/", "editorial-policy/", "ai-security-ir/", "repository-compromise/", "playbooks/ransomware/", "playbooks/business-email-compromise/", "playbooks/cloud-identity-compromise/", "playbooks/data-exfiltration/", "playbooks/malware-outbreak/"];
  return [...routes.map(path => ({ url: `https://lrinfosec.com/${path}` })), ...publishedArticles().map(a => ({ url: `https://lrinfosec.com${a.href}`, lastModified: a.publishDate }))];
}
