import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Label before retrieval: securing data before AI touches it",
  description: "A practical control architecture for preserving classification, ownership, authorization, retention, and tenant boundaries through RAG pipelines and agent memory.",
};

export default function Article() {
  return <main className="article-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link><nav aria-label="Primary navigation"><Link href="/#knowledge">Knowledge</Link><a href="/IncidentResponse/">Framework</a><Link href="/#playbooks">Playbooks</Link><Link href="/articles">Articles</Link></nav><Link className="header-cta" href="/articles">All field notes ↗</Link></header>
    <section className="article-head"><p className="eyebrow">FIELD NOTE 007 · AI SECURITY · 14 AUG 2026</p><h1>Label before retrieval: securing data before AI touches it</h1><p className="dek">RAG security begins before embedding. Preserve ownership, classification, authorization, retention, and tenant boundaries from the source document through retrieval, prompt assembly, and agent memory.</p></section>
    <div className="article-body">
      <aside className="toc"><b>IN THIS NOTE</b>01 / Classify first<br/>02 / Ownership<br/>03 / Data flow<br/>04 / Authorization<br/>05 / Tenant boundaries<br/>06 / Vector stores<br/>07 / Retention<br/>08 / Prompts and memory<br/>09 / Evidence and testing</aside>
      <article className="prose">
        <p>A retrieval-augmented generation pipeline can convert a well-controlled document into an embedding, split it into chunks, copy it into a shared index, place it inside a prompt, and retain part of the interaction as agent memory.</p>
        <p>At each transformation, security context can be weakened or lost.</p>
        <p>The source repository may know that a document belongs to Finance, contains restricted acquisition information, expires after seven years, and is readable by only three groups. A vector store will not automatically understand those obligations. Unless the pipeline carries them forward and enforces them at query time, semantic similarity can become an unintended path around source-system authorization.</p>
        <div className="callout"><strong>Operating principle:</strong> The model should never receive information merely because the vector store found it relevant. Retrieval must establish that the requesting identity is permitted to access the exact content now.</div>
        <h2>1. Classify before embedding</h2>
        <p>Classification needs to happen before content enters the embedding pipeline—not after the model has already processed it.</p>
        <p>For every source object, establish at least:</p>
        <ul><li>Authoritative owner</li><li>Business purpose</li><li>Sensitivity classification</li><li>Tenant or organizational boundary</li><li>Source-system identifier</li><li>Access-control policy or ACL reference</li><li>Retention and deletion requirement</li><li>Geographic or regulatory restrictions</li><li>Integrity and trust status</li><li>Permitted AI uses</li></ul>
        <p>Sensitivity labels are useful because they express how an organization handles information without requiring every downstream system to inspect the original content. Microsoft documents that Purview labels can extend across files, data assets, SharePoint, Teams, Power BI, and SQL, although implementation behavior differs between services. <a href="https://learn.microsoft.com/en-us/purview/data-map-sensitivity-labels" rel="noopener noreferrer">Microsoft Purview sensitivity labels ↗</a></p>
        <p>A label, however, is not an authorization decision.</p>
        <p><code>Confidential</code> describes handling requirements. It does not prove that the current user can read every confidential document. The ingestion pipeline must preserve both classification and resource-level authorization.</p>
        <p>Do not accept a model-generated classification as authoritative. Classification should originate from the source system, a governed data catalog, a deterministic policy, or a reviewed detection process. AI-assisted classification may recommend a label, but ambiguous or high-impact decisions need an accountable owner.</p>
        <h2>2. Make ownership operational</h2>
        <p>“Owned by Security” is not enough metadata.</p>
        <p>The owner must have responsibility for approving the data source for AI use, defining permitted user populations, reviewing classification exceptions, responding to access disputes, revalidating stale content, authorizing derived datasets and embeddings, and approving retention or deletion changes.</p>
        <p>The pipeline should quarantine content when the owner is unknown, inactive, or outside the tenant responsible for the AI application.</p>
        <p>Ownership must also survive chunking. A paragraph extracted from a policy does not become ownerless because it no longer resembles the original file. Each chunk should retain a stable reference to the source object, owner, policy version, and access-control material.</p>
        <h2>3. Carry policy through the data flow</h2>
        <figure className="architecture-flow"><img src="/diagrams/label-before-retrieval-flow.svg" alt="Security architecture showing governed source ingestion, classification, chunking, embedding, tenant-scoped vector storage, permission-aware retrieval, prompt assembly, output controls, and isolated agent memory"/><figcaption>REFERENCE ARCHITECTURE / POLICY CONTEXT FROM SOURCE TO PROMPT AND MEMORY</figcaption></figure>
        <p>The most important controls are the two gates:</p>
        <ol><li>The ingestion gate decides whether the organization permits the content to be used by this AI system.</li><li>The retrieval gate decides whether this identity may receive this content for this purpose at this moment.</li></ol>
        <p>Neither decision belongs to the model.</p>
        <h2>4. Preserve authorization at chunk level</h2>
        <p>RAG systems often retrieve chunks rather than complete documents. Authorization must therefore remain resolvable for every chunk.</p>
        <pre><code>{`{
  "tenant_id": "tenant-blue",
  "source_id": "sharepoint:item:8f27",
  "source_version": "2026-08-03T14:22:11Z",
  "owner_id": "finance-risk",
  "classification": "restricted",
  "permitted_groups": ["finance-ir", "legal-investigations"],
  "ai_use": ["incident-analysis"],
  "retention_until": "2033-08-03",
  "legal_hold": false,
  "policy_version": "rag-access-2026.08",
  "content_digest": "sha256:..."
}`}</code></pre>
        <p>At retrieval time:</p>
        <ol><li>Authenticate the human or workload identity.</li><li>Establish the tenant from trusted identity context.</li><li>Determine groups, roles, purpose, and environmental conditions.</li><li>Apply tenant and authorization filters before semantic results are returned.</li><li>Revalidate the selected results against current policy.</li><li>Reject chunks with missing, stale, or malformed security metadata.</li><li>Record why each chunk was released.</li></ol>
        <p>Azure AI Search documents security-filter and identity-based approaches for document-level result trimming. Its security-filter pattern stores identities with indexed documents and filters results using the caller&apos;s identity. Some native ACL and RBAC integrations remain preview capabilities and should be evaluated accordingly. <a href="https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview" rel="noopener noreferrer">Azure AI Search document-level access control ↗</a></p>
        <p>Google similarly supports access-controlled data sources for Agent Search and notes that access control must be configured when the data store is created rather than added later to an existing store. <a href="https://docs.cloud.google.com/generative-ai-app-builder/docs/data-source-access-control" rel="noopener noreferrer">Google Cloud data-source access control ↗</a></p>
        <div className="callout"><strong>Fail-closed rule:</strong> A chunk without valid authorization metadata is not public. It is unavailable until policy can be resolved.</div>
        <h2>5. Enforce tenant boundaries independently</h2>
        <p>Authentication and tenant isolation are related but different controls.</p>
        <p>A user can be properly authenticated and authorized for an application while a query, cache key, vector namespace, tool credential, or memory identifier accidentally points to another tenant. AWS guidance makes the same distinction: authorization does not inherently guarantee that one tenant cannot access another tenant&apos;s resources. <a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/saas-multitenant-api-access-authorization/faq.html" rel="noopener noreferrer">AWS tenant-isolation guidance ↗</a></p>
        <ul><li>Derive <code>tenant_id</code> from trusted identity claims, never from prompt text.</li><li>Bind the tenant to the request at the application edge.</li><li>Use tenant-scoped credentials where supported.</li><li>Partition indexes, namespaces, collections, encryption keys, or accounts according to risk.</li><li>Include tenant scope in cache and memory keys.</li><li>Reject a result whose stored tenant differs from the authenticated tenant.</li><li>Test cross-tenant queries intentionally.</li><li>Monitor zero-result and denied cross-tenant attempts.</li></ul>
        <p>For high-sensitivity environments, separate vector stores or accounts may be more defensible than metadata-only separation. Shared infrastructure can still be appropriate, but the isolation control must exist below the model and be tested independently.</p>
        <p>AWS&apos;s agentic-AI guidance illustrates tenant-specific knowledge stores and tenant-scoped credentials as enforcement options. <a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-multitenant/enforcing-tenant-isolation.html" rel="noopener noreferrer">AWS agentic-AI tenant isolation ↗</a></p>
        <h2>6. Treat embeddings and vector stores as sensitive data</h2>
        <p>An embedding is not automatically anonymous, harmless, or exempt from data handling rules.</p>
        <p>Vector and embedding systems introduce risks including unauthorized retrieval, cross-context leakage, poisoning, and the possibility of recovering information about source content. OWASP recommends fine-grained access control, logical partitioning, source validation, and review when combining datasets with different restrictions. <a href="https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/" rel="noopener noreferrer">OWASP vector and embedding weaknesses ↗</a></p>
        <table className="decision-table"><thead><tr><th>CONTROL AREA</th><th>REQUIRED BEHAVIOR</th></tr></thead><tbody><tr><td>Authentication</td><td>Disable anonymous access; prefer workload identity over static API keys</td></tr><tr><td>Authorization</td><td>Separate ingestion, query, administration, backup, and deletion privileges</td></tr><tr><td>Encryption</td><td>Encrypt in transit and at rest; control key administration separately</td></tr><tr><td>Network</td><td>Restrict public exposure and administrative paths</td></tr><tr><td>Partitioning</td><td>Enforce tenant, classification, and environment boundaries</td></tr><tr><td>Integrity</td><td>Record source digest, chunking version, and embedding-model version</td></tr><tr><td>Logging</td><td>Capture query identity, filters, result identifiers, policy, and outcome</td></tr><tr><td>Backup</td><td>Apply the same classification, encryption, retention, and deletion rules</td></tr></tbody></table>
        <p>The embedding service also sees the content. Confirm provider data handling, residency, retention, abuse-monitoring, and training terms before sending restricted material.</p>
        <h2>7. Keep retention and deletion attached to derivatives</h2>
        <p>Retention is not satisfied by deleting only the original file.</p>
        <p>A single source can produce parsed text, extracted tables, OCR output, chunks, embeddings, search caches, prompt logs, model traces, evaluation datasets, conversation summaries, agent memory, and backups.</p>
        <p>The deletion process needs a derivation map from the source object to each downstream copy. Retention metadata should drive an event-based workflow when the source expires, an owner deletes it, a label or ACL changes, a tenant relationship ends, consent is withdrawn, a legal hold changes, or an integrity issue invalidates the source.</p>
        <p>Microsoft supports automatically applying retention labels using sensitive information, keywords, searchable properties, and classifiers, but AI pipelines must still propagate and enforce the resulting requirement across their own derivative stores. <a href="https://learn.microsoft.com/en-us/purview/apply-retention-labels-automatically" rel="noopener noreferrer">Microsoft Purview automatic retention labels ↗</a></p>
        <p>A nightly rebuild is rarely enough for urgent revocation. High-risk systems need deletion and authorization-change events that invalidate vector records, caches, and memory promptly.</p>
        <h2>8. Control what enters the prompt</h2>
        <p>Permission-aware retrieval is necessary, but the prompt assembly layer remains a security boundary.</p>
        <ul><li>Recheck the current identity and tenant.</li><li>Limit the number and total size of chunks.</li><li>Remove fields that are not required for the task.</li><li>Apply masking or tokenization where appropriate.</li><li>Preserve citations and source identifiers.</li><li>Mark retrieved text as untrusted data, not executable instructions.</li><li>Reject content whose source changed after retrieval.</li><li>Detect unusual combinations of classifications or owners.</li><li>Prevent retrieved content from changing system policy or tool authority.</li></ul>
        <p>A user&apos;s permission to read a record does not automatically justify placing the entire record in a third-party model context. Purpose, minimization, provider terms, and application risk still matter.</p>
        <h2>9. Treat agent memory as another governed data store</h2>
        <p>Agent memory often begins as a convenience feature and quietly becomes a new system of record.</p>
        <p>Memory can contain user prompts, retrieved confidential passages, model conclusions, tool results, credentials or identifiers, personal preferences, incident details, and incorrect model-generated assertions.</p>
        <p>Memory should carry an owner and subject, tenant, conversation or agent scope, sensitivity, source provenance, creation and expiration times, permitted future uses, integrity status, and deletion reference.</p>
        <p>Do not allow one user&apos;s memory to enter another user&apos;s context. Do not let shared agents merge tenant memories. Do not promote temporary conversation material into long-term memory without a defined policy.</p>
        <p>OWASP&apos;s LLM Verification Standard calls for segregation of conversational and long-term memory, authenticated storage, least privilege, leakage controls, and protection against unauthorized knowledge-base updates. <a href="https://owasp.org/www-project-llm-verification-standard/LLMSVS-v2.0-en.html" rel="noopener noreferrer">OWASP LLM Verification Standard ↗</a></p>
        <table className="decision-table"><thead><tr><th>MEMORY CLASS</th><th>DEFAULT CONTROL</th></tr></thead><tbody><tr><td>Session memory</td><td>Short TTL and isolated to one authenticated session</td></tr><tr><td>User memory</td><td>Explicit user scope and deletion path</td></tr><tr><td>Team memory</td><td>Owner approval and membership-aware retrieval</td></tr><tr><td>Organizational memory</td><td>Governed ingestion like any other knowledge base</td></tr><tr><td>Agent operational memory</td><td>Required state only—not a general archive of prompts</td></tr></tbody></table>
        <h2>10. Log the security decision—not the sensitive content</h2>
        <p>For each ingestion and retrieval event, record the request and trace ID, human and workload identity, tenant, purpose, source and chunk identifiers, classification and owner, policy revision, filters, allow or deny outcome, prompt-assembly decision, model and embedding versions, memory-write decision, and retention events.</p>
        <p>Avoid copying complete prompts or retrieved passages into general-purpose logs. Logs can become a less protected duplicate knowledge base. Use identifiers, hashes, structured decisions, and tightly controlled forensic capture when full content is genuinely required.</p>
        <h2>11. Test the boundary as an attacker would</h2>
        <ul><li>Cross-tenant semantic searches</li><li>Users removed from an authorized group</li><li>Documents relabeled after embedding</li><li>ACL changes after indexing</li><li>Deleted documents still present in caches</li><li>Chunks missing ownership or tenant metadata</li><li>Forged tenant IDs in prompts or request bodies</li><li>Retrieval filters omitted by an alternate API path</li><li>Prompt injection inside an authorized document</li><li>Poisoned documents from a compromised source</li><li>Memory retrieval across users or sessions</li><li>Expired content included in a prompt</li><li>Backup restoration that resurrects deleted vectors</li><li>Administrative keys used from an untrusted workload</li></ul>
        <p>Test both expected denials and the telemetry produced by them.</p>
        <h2>Field checklist</h2>
        <ul><li>Data has an accountable owner before ingestion.</li><li>Classification and AI-use approval are separate decisions.</li><li>Every chunk retains source, tenant, owner, ACL, retention, and integrity context.</li><li>Tenant identity comes from trusted authentication.</li><li>Retrieval applies authorization before content reaches the model.</li><li>Missing or stale policy metadata fails closed.</li><li>Vector storage, caches, prompts, and memory inherit source protections.</li><li>ACL, label, retention, and deletion changes propagate downstream.</li><li>Agent memory is isolated and expires deliberately.</li><li>Logs preserve decision evidence without unnecessarily duplicating content.</li><li>Cross-tenant, stale-access, poisoning, and deletion scenarios are continuously tested.</li></ul>
        <h2>Closing position</h2>
        <p>The important question is not, “Can the model find this document?”</p>
        <p>It is, “Should this identity, operating for this tenant and purpose, receive this exact information now—and can the system prove why it allowed that?”</p>
        <div className="callout"><strong>The boundary:</strong> Classification describes the data. Ownership establishes accountability. Authorization permits retrieval. Retention limits its lifetime. Tenant isolation contains its reach. Those controls must remain intact before AI touches the content, while it is inside the pipeline, and after the interaction becomes memory.</div>
      </article>
    </div>
  </main>;
}
