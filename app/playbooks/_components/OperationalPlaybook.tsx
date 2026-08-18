import Link from "next/link";
import { GuideProvenance } from "../../components/GuideProvenance";

export type Playbook = {
  code: string;
  title: string;
  summary: string;
  severity: string;
  firstAction: string;
  triggers: string[];
  evidence: string[];
  first15: string[];
  contain: string[];
  eradicate: string[];
  recover: string[];
  gates: { title: string; text: string }[];
};

export const playbooks: Record<string, Playbook> = {
  ransomware: {
    code: "IR-01", title: "Ransomware", severity: "Critical", firstAction: "Isolate active encryption paths",
    summary: "Contain encryption and privileged access without destroying the evidence or recovery systems needed to restore safely.",
    triggers: ["Confirmed encryption, ransom note, or destructive file changes", "EDR or identity telemetry shows lateral movement with privileged access", "Backup, hypervisor, identity, or security tooling is targeted"],
    evidence: ["EDR process trees, volatile connections, memory and host timelines", "Identity, VPN, remote access, authentication, and privilege-change logs", "File server, hypervisor, backup, cloud, firewall, DNS, and proxy telemetry", "Ransom notes, samples, hashes, commands, accounts, IPs, domains, and UTC timestamps"],
    first15: ["Declare a critical incident; assign command, operations, forensics, recovery, and communications owners.", "Isolate confirmed hosts and block known command-and-control paths while preserving management visibility.", "Protect identity, hypervisor, backup, and security-management planes; pause destructive automation.", "Snapshot volatile evidence and identify the earliest affected identity, host, and execution event.", "Determine whether encryption, exfiltration, or destructive actions remain active."],
    contain: ["Disable compromised identities and remote-access paths using scoped revocation first.", "Segment affected networks and restrict east-west protocols without cutting off forensic collection.", "Make backup repositories immutable or offline and verify attackers cannot reach recovery credentials."],
    eradicate: ["Rebuild compromised systems from trusted media; do not rely on cleaning unknown persistence.", "Remove unauthorized identities, tools, scheduled tasks, services, policies, and remote-management changes.", "Rotate affected credentials from a known-clean administrative workstation."],
    recover: ["Restore identity and security controls before business workloads.", "Validate backups, recovery points, dependencies, monitoring, and business-owner acceptance.", "Reconnect in stages with heightened detection and a tested isolation rollback."],
    gates: [{title:"Containment gate",text:"Active encryption and attacker access are stopped; evidence collection and recovery infrastructure remain available."},{title:"Eradication gate",text:"Initial access, privilege escalation, lateral movement, and persistence are explained and removed."},{title:"Recovery gate",text:"Trusted restores pass security and business validation, monitoring is active, and rollback owners are named."}],
  },
  "business-email-compromise": {
    code: "IR-02", title: "Business email compromise", severity: "Critical", firstAction: "Secure the affected identity",
    summary: "Stop fraudulent access and payment risk, preserve mailbox evidence, and find every persistence and delegated-access path.",
    triggers: ["Unexpected payment, payroll, banking, or supplier-detail change", "Suspicious inbox rules, forwarding, OAuth grants, or sent messages", "Impossible travel, adversary-in-the-middle session use, or MFA changes"],
    evidence: ["Sign-in, token, MFA, device, and conditional-access logs", "Mailbox audit, message trace, inbox rules, delegates, forwarding, and sent/deleted items", "OAuth applications, consent grants, transport rules, connectors, and administrative changes", "Payment instructions, headers, attachments, domains, conversation IDs, and UTC timeline"],
    first15: ["Contact finance through a trusted channel to stop or recall affected payments.", "Revoke sessions and tokens, reset authentication, and secure MFA from a known-clean device.", "Preserve mailbox, identity, message-trace, and payment evidence before deleting rules or messages.", "Disable malicious forwarding, rules, delegates, applications, and transport changes.", "Identify every recipient, transaction, supplier, and internal identity touched."],
    contain: ["Block malicious domains, senders, URLs, sessions, and applications.", "Protect high-risk finance workflows with out-of-band verification and dual approval.", "Hunt related accounts, shared mailboxes, delegates, and similar rule names or destinations."],
    eradicate: ["Remove persistence and rotate exposed identity, application, and third-party credentials.", "Correct supplier or payroll records changed through the compromised workflow.", "Review endpoint and browser state when token theft or adversary-in-the-middle access is suspected."],
    recover: ["Restore access with phishing-resistant authentication and least privilege.", "Notify affected parties using verified contact data and monitor follow-on fraud.", "Validate mailbox configuration, application consent, finance controls, and detection coverage."],
    gates: [{title:"Containment gate",text:"Fraudulent sessions, forwarding, payment paths, and persistence are disabled."},{title:"Investigation gate",text:"Message, identity, application, recipient, and financial scope is documented."},{title:"Recovery gate",text:"Finance and identity owners validate records, controls, notifications, and monitoring."}],
  },
  "cloud-identity-compromise": {
    code: "IR-03", title: "Cloud identity compromise", severity: "Critical", firstAction: "Revoke active sessions and tokens",
    summary: "Contain compromised human and workload identities, find delegated access and persistence, and validate every downstream action.",
    triggers: ["Unexpected token use, role assumption, consent, key creation, or MFA change", "Activity from unfamiliar networks, devices, agents, or geographies", "Security controls, logging, policies, or recovery methods are changed"],
    evidence: ["Authentication, token issuance, federation, MFA, conditional-access, and device logs", "Cloud control-plane, API, resource, network, and data-access audit logs", "Role, policy, group, application, service-principal, key, and secret changes", "Session identifiers, token IDs, actors, IPs, user agents, resources, and UTC timestamps"],
    first15: ["Revoke sessions and tokens; disable the identity when active misuse outweighs availability impact.", "Preserve identity and cloud audit data, configuration, policy versions, and affected-resource state.", "Block known attacker infrastructure and require trusted administrative paths.", "Inventory roles, delegated credentials, applications, keys, secrets, and reachable tenants or accounts.", "Identify destructive, persistence, data-access, and security-control changes."],
    contain: ["Remove high-risk role assignments and temporary credentials while maintaining break-glass access.", "Disable unauthorized applications, federation paths, API keys, automation, and recovery methods.", "Apply scoped deny controls to affected resources, regions, services, or data planes."],
    eradicate: ["Remove backdoor identities, policies, keys, functions, automation, and cross-account trust.", "Rotate secrets from a clean control plane and update every dependent workload.", "Restore logging and security controls from reviewed configuration-as-code."],
    recover: ["Re-enable identities with phishing-resistant MFA and reduced privilege.", "Validate resource integrity, data access, billing, deployments, and security telemetry.", "Monitor affected identities and equivalent indicators across all tenants and accounts."],
    gates: [{title:"Containment gate",text:"Attacker sessions and delegated paths are invalid, with trusted administration preserved."},{title:"Eradication gate",text:"All persistence, policy, key, application, and federation changes are reconciled."},{title:"Recovery gate",text:"Resource owners approve integrity, privilege, telemetry, and staged restoration."}],
  },
  "data-exfiltration": {
    code: "IR-04", title: "Data exfiltration", severity: "High", firstAction: "Stop the confirmed transfer path",
    summary: "Bound what was accessed and transferred, preserve reliable evidence, stop continuing egress, and support defensible notification decisions.",
    triggers: ["Unusual downloads, exports, queries, archives, sync, sharing, or outbound transfers", "Sensitive data reaches an unauthorized tenant, identity, repository, model, or destination", "DLP, database, SaaS, cloud, proxy, or endpoint telemetry indicates collection and staging"],
    evidence: ["Authoritative data-access, query, object, file, SaaS, and application audit logs", "Proxy, DNS, firewall, CASB, DLP, endpoint, email, and cloud egress records", "Classification, ownership, retention, jurisdiction, tenant, and affected-subject metadata", "Files, archives, hashes, row counts, query text, destination, identity, and UTC timeline"],
    first15: ["Stop the confirmed egress channel with the narrowest effective block.", "Preserve access and transfer logs, affected-object metadata, queries, and endpoint state.", "Secure involved identities, tokens, applications, shares, links, and destinations.", "Identify data owner, classification, jurisdictions, subjects, and notification stakeholders.", "Separate confirmed transfer from accessed, staged, attempted, and merely reachable data."],
    contain: ["Disable unauthorized sharing, exports, sync, API access, and public exposure.", "Block destinations and revoke sessions while retaining investigative access to logs.", "Apply temporary monitoring or approval to equivalent bulk-access paths."],
    eradicate: ["Close the initial-access and authorization failure; remove persistence and exposed credentials.", "Revoke shared links, cached credentials, API keys, and third-party access.", "Correct classification, tenant-boundary, retention, and least-privilege control failures."],
    recover: ["Restore business access in stages with monitoring and volume controls.", "Validate the exposure calculation with data, legal, privacy, and business owners.", "Document confirmed facts, uncertainty, decision rationale, notifications, and residual risk."],
    gates: [{title:"Scope gate",text:"Confirmed transfer is distinguished from access, staging, attempts, and theoretical reach."},{title:"Containment gate",text:"Ongoing access and egress are stopped without destroying authoritative evidence."},{title:"Recovery gate",text:"Data owners approve scope, notification decisions, controls, monitoring, and residual uncertainty."}],
  },
  "malware-outbreak": {
    code: "IR-06", title: "Malware outbreak", severity: "High", firstAction: "Isolate confirmed execution",
    summary: "Contain malicious execution, preserve volatile evidence, identify delivery and persistence, and restore affected assets from trusted state.",
    triggers: ["Confirmed malicious process, file, script, service, task, extension, or persistence", "Multiple endpoints share suspicious hashes, domains, behaviors, or parent processes", "Security tooling is disabled, tampered with, or bypassed"],
    evidence: ["EDR telemetry, memory, process trees, command lines, modules, handles, and connections", "Files, hashes, signatures, scripts, persistence, quarantine records, and sandbox output", "Email, browser, download, proxy, DNS, firewall, identity, and software-deployment logs", "Host, user, privilege, first/last seen, prevalence, related alerts, and UTC timeline"],
    first15: ["Isolate confirmed systems while retaining EDR or forensic connectivity.", "Capture volatile evidence and quarantine representative samples under controlled access.", "Block validated hashes, domains, IPs, URLs, certificates, and execution paths.", "Identify patient zero, delivery mechanism, privilege, persistence, and lateral movement.", "Hunt the same behaviors across endpoints, identities, servers, cloud workloads, and images."],
    contain: ["Disable compromised identities and abused remote-management or software-delivery paths.", "Segment affected assets and prevent removable-media or shared-drive propagation.", "Protect security management, identity, backup, and deployment systems from tampering."],
    eradicate: ["Reimage systems when integrity cannot be proven; remove unauthorized persistence and tooling.", "Patch the exploited path and replace compromised packages, images, installers, or policies.", "Rotate exposed credentials from known-clean systems."],
    recover: ["Restore from trusted images and validate EDR, patching, logging, and application integrity.", "Reconnect staged cohorts and watch for recurring indicators or control tampering.", "Confirm business function, asset ownership, and rollback readiness."],
    gates: [{title:"Containment gate",text:"Malicious execution and propagation are stopped, with representative evidence preserved."},{title:"Eradication gate",text:"Delivery, execution, privilege, persistence, and affected population are understood and removed."},{title:"Recovery gate",text:"Trusted rebuilds pass security and service checks under enhanced monitoring."}],
  },
};

export function OperationalPlaybook({ playbook }: { playbook: Playbook }) {
  const sections = [["Contain", playbook.contain], ["Eradicate", playbook.eradicate], ["Recover", playbook.recover]] as const;
  const referenceBasis: Record<string,string[]> = {
    "IR-01": ["NIST SP 800-61 Rev. 3 incident-response guidance", "CISA ransomware response guidance", "MITRE ATT&CK Enterprise techniques"],
    "IR-02": ["NIST SP 800-61 Rev. 3", "CISA guidance for phishing and business email compromise", "MITRE ATT&CK identity and email techniques"],
    "IR-03": ["NIST SP 800-61 Rev. 3", "Cloud-provider identity and audit guidance", "MITRE ATT&CK Cloud techniques"],
    "IR-04": ["NIST SP 800-61 Rev. 3", "NIST CSF 2.0", "Applicable privacy, contractual, and breach-notification requirements"],
    "IR-06": ["NIST SP 800-61 Rev. 3", "CISA malware analysis and containment guidance", "MITRE ATT&CK Enterprise techniques"],
  };
  return <main className="guide-page"><header className="site-header"><Link className="brand" href="/" aria-label="LR InfoSec home"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link><nav aria-label="Primary navigation"><Link href="/IncidentResponse/">Framework</Link><Link href="/#playbooks">Playbooks</Link><Link href="/ai-security-ir">AI Security IR</Link><Link href="/repository-compromise">Repository IR</Link></nav><Link className="header-cta" href="/#playbooks">All playbooks ↗</Link></header><section className="guide-hero"><p className="eyebrow"><span className="live-dot"/>OPERATIONAL PLAYBOOK · {playbook.code}</p><h1>{playbook.title}</h1><p className="dek">{playbook.summary}</p><div className="operator-meta"><span>SEVERITY / {playbook.severity.toUpperCase()}</span><span>FIRST ACTION / {playbook.firstAction.toUpperCase()}</span><span>FORMAT / PRINT-READY</span></div><div className="guide-nav"><a href="#recognize">Recognize</a><a href="#evidence">Evidence</a><a href="#first-15">First 15 minutes</a><a href="#procedure">Procedure</a><a href="#gates">Decision gates</a></div></section><div className="guide-content">
    <section className="guide-section" id="recognize"><h2>Recognize and declare</h2><p className="intro">Treat these signals as an incident when they cross an authorization, confidentiality, integrity, availability, or safety boundary.</p><ul className="operator-list">{playbook.triggers.map(x=><li key={x}>{x}</li>)}</ul></section>
    <section className="guide-section" id="evidence"><h2>Preserve the evidence</h2><p className="intro">Collect authoritative records before destructive cleanup whenever operationally safe. Record source, collector, UTC time, integrity hash, access, and retention decision.</p><ul className="operator-list">{playbook.evidence.map(x=><li key={x}>{x}</li>)}</ul></section>
    <section className="playbook-box" id="first-15"><p className="eyebrow">{playbook.code} · FIRST 15 MINUTES</p><h2>Reduce immediate uncertainty</h2><ol>{playbook.first15.map(x=><li key={x}>{x}</li>)}</ol></section>
    <section className="guide-section" id="procedure"><h2>Contain → eradicate → recover</h2><div className="phase-grid">{sections.map(([title,items],i)=><article className="phase-card" key={title}><small>PHASE / 0{i+1}</small><h3>{title}</h3><ul className="operator-list">{items.map(x=><li key={x}>{x}</li>)}</ul></article>)}</div></section>
    <section className="guide-section" id="gates"><h2>Decision gates</h2><p className="intro">Record the owner, evidence, uncertainty, operational impact, and rollback condition at every transition.</p><div className="operator-gates">{playbook.gates.map(g=><article key={g.title}><h3>{g.title}</h3><p>{g.text}</p></article>)}</div><div className="callout"><strong>Rollback safeguard:</strong> define the last known-good state, measurable failure signals, accountable decision owner, and fastest safe return path before restoring service.</div></section>
    <GuideProvenance code={playbook.code} standards={referenceBasis[playbook.code] ?? ["NIST SP 800-61 Rev. 3"]} assumptions={["The organization has authorized incident leadership, protected communications, and access to relevant telemetry.", "Actions are adapted to business impact, legal obligations, architecture, and available evidence before execution."]} limitations={["This field guide is not a substitute for organization-specific legal, privacy, safety, regulatory, or business-continuity advice.", "Vendor interfaces and log availability vary by product, plan, region, configuration, and retention period."]}/>
  </div></main>;
}
