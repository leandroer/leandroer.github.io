export type ArticleSection = { id: string; title: string };

export type ArticleOperations = {
  verified: string;
  trigger: string;
  actions: string[];
  evidence: string;
  authority: string;
  exit: string;
  sections: ArticleSection[];
};

export const articleOperations: Record<string, ArticleOperations> = {
  "ransomware-containment-is-a-business-decision": {
    verified: "19 June 2026",
    trigger: "Confirmed encryption, destructive activity, or coordinated precursor behavior with credible risk of propagation.",
    actions: ["Isolate active execution paths", "Protect identity and management planes", "Stop lateral propagation", "Preserve volatile evidence", "Establish operational and business impact"],
    evidence: "EDR process trees, authentication events, network flows, backup/control-plane logs, timestamps, and every containment action.",
    authority: "Endpoint or network isolation, privileged-account restriction, service shutdown, external communications, and recovery sequencing.",
    exit: "No new encryption or propagation, control planes are trusted, evidence is preserved, and recovery owners accept the staged restoration plan.",
    sections: [{id:"objectives",title:"Containment objectives"},{id:"first-four-hours",title:"First four hours"},{id:"blast-radius",title:"Blast radius"},{id:"control-surfaces",title:"Control surfaces"},{id:"evidence",title:"Evidence"},{id:"recovery",title:"Recovery gates"}],
  },
  "what-to-log-before-your-first-ai-incident": {
    verified: "3 July 2026",
    trigger: "A suspected AI incident cannot be reconstructed across prompts, retrieval, policy, tools, identities, and target systems.",
    actions: ["Preserve available telemetry", "Freeze logging and runtime configuration", "Establish a UTC timeline", "Correlate request and action identifiers", "Document evidence gaps"],
    evidence: "Prompt and model versions, retrieval IDs, policy decisions, tool envelopes, identity claims, target audit events, and clock status.",
    authority: "Expanded logging, access to sensitive traces, retention holds, provider escalation, and any decision to degrade or suspend service.",
    exit: "The team has a reproducible correlation chain, protected evidence, and named owners for every material visibility gap.",
    sections: [{id:"questions",title:"Investigation questions"},{id:"correlation",title:"Correlation chain"},{id:"event-classes",title:"Event classes"},{id:"protect",title:"Protect telemetry"},{id:"validate",title:"Validate coverage"}],
  },
  "responding-to-agent-incidents": {
    verified: "17 July 2026",
    trigger: "An agent attempts or completes an action outside its authorized identity, data, tool, tenant, or approval boundary.",
    actions: ["Pause new runs and queues", "Revoke delegated credentials", "Deny risky tools", "Snapshot agent state", "Hunt downstream actions"],
    evidence: "Agent and prompt versions, identity claims, retrieval and memory references, policy decisions, tool calls, approvals, and target logs.",
    authority: "Workflow suspension, credential revocation, tool denial, tenant isolation, and staged restoration of write capability.",
    exit: "The initiating input, authorization path, affected systems, control failure, and evidence that prevents recurrence are all explainable.",
    sections: [{id:"recognize",title:"Recognize"},{id:"scope",title:"Scope four planes"},{id:"contain",title:"Contain safely"},{id:"preserve",title:"Preserve evidence"},{id:"recover",title:"Recover"},{id:"checklist",title:"Checklist"}],
  },
  "opa-policy-guardrails-for-ai-agents": {
    verified: "31 July 2026",
    trigger: "A high-impact agent action bypasses policy, receives an inconsistent allow decision, or executes without a matching approval.",
    actions: ["Deny high-risk tool execution", "Freeze policy bundles and inputs", "Preserve decision records", "Revoke affected approvals and grants", "Verify downstream consequences"],
    evidence: "Policy input, decision ID, bundle hash, OPA logs, approval digest, tool request, agent identity, and authoritative target events.",
    authority: "Fail-closed operation, workflow shutdown, emergency-access handling, policy rollback, and restoration of privileged actions.",
    exit: "The corrected policy is independently enforced, regression-tested, observable, and bound to the exact action and approval context.",
    sections: [{id:"boundary",title:"Execution boundary"},{id:"facts",title:"Structured facts"},{id:"contract",title:"Decision contract"},{id:"rego",title:"Rego policy"},{id:"approval",title:"Approval binding"},{id:"failure",title:"Failure behavior"},{id:"testing",title:"Audit and testing"}],
  },
  "label-before-retrieval": {
    verified: "14 August 2026",
    trigger: "Sensitive, misclassified, unauthorized, expired, or cross-tenant data enters retrieval, prompts, or persistent memory.",
    actions: ["Stop affected ingestion", "Quarantine source material", "Deny retrieval of affected derivatives", "Preserve lineage and authorization state", "Scope prompts, memory, and downstream actions"],
    evidence: "Source versions, owners, labels, ACLs, tenant IDs, chunks, embeddings, vector records, prompt assembly, memory writes, and deletions.",
    authority: "Data quarantine, access revocation, derivative deletion, privacy escalation, index reconstruction, and controlled restoration.",
    exit: "Every affected derivative is removed or correctly governed, tenant isolation is proven, and trusted data can be rebuilt from accountable sources.",
    sections: [{id:"classify",title:"Classify"},{id:"ownership",title:"Ownership"},{id:"policy-flow",title:"Policy flow"},{id:"authorization",title:"Chunk authorization"},{id:"tenant",title:"Tenant boundaries"},{id:"retention",title:"Retention"},{id:"memory",title:"Agent memory"},{id:"testing",title:"Boundary tests"}],
  },
  "first-60-minutes-ai-security-incident": {
    verified: "28 August 2026",
    trigger: "An AI-enabled workflow crosses or attempts to cross an identity, data, tool, tenant, environment, or approval boundary.",
    actions: ["Declare and assign incident command", "Suspend runs, queues, schedules, and handoffs", "Revoke unsafe authority", "Preserve volatile runtime state", "Hunt and validate downstream actions"],
    evidence: "Agent configuration, prompts, retrieval, memory, policy inputs, tool calls, identities, queue state, traces, target logs, and responder actions.",
    authority: "Agent suspension, identity revocation, tool denial, target-system containment, evidence access, communications, and recovery approval.",
    exit: "No unsafe activity continues, critical evidence is preserved, downstream scope is bounded, and the next decision gate has an owner.",
    sections: [{id:"recognition",title:"Recognition"},{id:"timeline",title:"First-hour timeline"},{id:"command",title:"Incident command"},{id:"suspend",title:"Suspend execution"},{id:"revoke",title:"Revoke authority"},{id:"evidence",title:"Preserve evidence"},{id:"hunt",title:"Hunt downstream"},{id:"exit",title:"Exit criteria"}],
  },
  "when-your-ai-evidence-cannot-be-trusted": {
    verified: "20 October 2026",
    trigger: "AI records are missing, internally inconsistent, mutable, provider-limited, or insufficient to prove which action occurred.",
    actions: ["Preserve independent target records", "Freeze logging and runtime changes", "Snapshot prompts, memory, and retrieval state", "Hash and restrict evidence exports", "Separate known, inferred, and unknown facts"],
    evidence: "Trace/span IDs, effective prompts, tool requests and responses, retrieval context, memory versions, timestamps, approvals, and target events.",
    authority: "Sensitive-content collection, retention holds, provider escalation, service suspension, disclosure decisions, and acceptance of evidentiary uncertainty.",
    exit: "The evidence chain is reproducible, material gaps are explicit, conclusions carry confidence, and recovery does not depend on an unverified transcript.",
    sections: [{id:"evidence-problem",title:"Evidence problem"},{id:"architecture",title:"Provenance architecture"},{id:"transcript",title:"Transcript limits"},{id:"tools",title:"Tool execution"},{id:"memory",title:"Memory"},{id:"prompt",title:"Effective prompt"},{id:"timestamps",title:"Timestamp integrity"},{id:"forensic-record",title:"Forensic record"}],
  },
  "compromised-machine-identities": {
    verified: "27 September 2026",
    trigger: "A service account, workload identity, key, OAuth application, certificate, or delegated token behaves outside its approved workload profile.",
    actions: ["Preserve principal and credential identifiers", "Stop new authority from being minted", "Deny access at resource enforcement points", "Revoke derived sessions and grants", "Hunt persistence and redeploy trusted workloads"],
    evidence: "Principal/application IDs, key IDs, thumbprints, issuer/subject/audience, roles, grants, token events, workload provenance, and resource logs.",
    authority: "Principal disablement, federation changes, resource denies, session revocation, credential rotation, workload shutdown, and staged access restoration.",
    exit: "The identity cannot authenticate, mint or reuse authority, delegate access, or recreate its path, and retired credentials show zero use.",
    sections: [{id:"recognition",title:"Recognition"},{id:"identity-graph",title:"Identity graph"},{id:"architecture",title:"Containment architecture"},{id:"sequence",title:"Containment sequence"},{id:"persistence",title:"Persistence hunt"},{id:"evidence",title:"Evidence"},{id:"recovery",title:"Recovery"}],
  },
  "poisoned-rag-pipelines": {
    verified: "20 October 2026",
    trigger: "Malicious or corrupted content, embeddings, index records, ranking metadata, cache, or memory can influence retrieval or agent action.",
    actions: ["Pause ingestion and memory writes", "Isolate affected retrieval paths", "Preserve volatile pipeline state", "Build the affected lineage window", "Block high-impact tools and downstream propagation"],
    evidence: "Source versions and digests, ingestion jobs, parser/chunk/embedding versions, vector IDs, retrieval traces, prompts, memory, and target actions.",
    authority: "Source quarantine, index write freeze, retrieval disablement, tool denial, cache and memory invalidation, trusted rebuild, and canary release.",
    exit: "Poisoned derivatives are removed, downstream influence is bounded, a trusted index passes integrity and authorization tests, and rollback is ready.",
    sections: [{id:"incident",title:"Incident threshold"},{id:"pipelines",title:"Two pipelines"},{id:"architecture",title:"Architecture"},{id:"first-30",title:"First 30 minutes"},{id:"lineage",title:"Affected window"},{id:"quarantine",title:"Quarantine"},{id:"downstream",title:"Downstream hunt"},{id:"recovery",title:"Recovery validation"}],
  },
  "unauthorized-agent-delegation": {
    verified: "25 October 2026",
    trigger: "An agent delegates to an unapproved destination, amplifies authority, spills context, exceeds propagation limits, or continues after cancellation.",
    actions: ["Deny new task edges", "Enumerate the complete descendant tree", "Cancel queued, running, and scheduled descendants", "Revoke task grants, leases, and sessions", "Block consequential tools and preserve the graph"],
    evidence: "Delegation ledger, policy and approval IDs, task contracts, queue state, handoff/tool spans, credentials, memory writes, and target events.",
    authority: "Root or deployment-wide delegation denial, subtree cancellation, queue quarantine, credential revocation, tool blocking, and business-impact acceptance.",
    exit: "No new edges can form, every descendant has a disposition, credentials are revoked, and high-impact targets reject further activity.",
    sections: [{id:"incident",title:"Running incident"},{id:"first-15",title:"First 15 minutes"},{id:"transaction",title:"Security transaction"},{id:"architecture",title:"Architecture"},{id:"event",title:"Delegation event"},{id:"detection",title:"Detection"},{id:"first-45",title:"First 45 minutes"},{id:"containment",title:"Containment"},{id:"recovery",title:"Recovery"}],
  },
};
