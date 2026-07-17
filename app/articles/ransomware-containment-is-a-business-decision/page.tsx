import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ransomware containment under pressure",
  description: "A technical decision framework for ransomware containment, evidence preservation, control-plane protection, and staged recovery.",
};

export default function Article() {
  return <main className="article-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link><nav><Link href="/#knowledge">Knowledge</Link><a href="/IncidentResponse/">Framework</a><Link href="/#playbooks">Playbooks</Link><Link href="/articles">Articles</Link></nav><Link className="header-cta" href="/articles">All field notes ↗</Link></header>
    <section className="article-head"><p className="eyebrow">FIELD NOTE 003 · PLAYBOOK · 19 JUN 2026</p><h1>Ransomware containment under pressure</h1><p className="dek">Isolation is a business decision—but responders still need concrete telemetry, tools, sequencing, and evidence-based exit criteria.</p></section>
    <div className="article-body">
      <aside className="toc"><b>IN THIS NOTE</b>01 / Containment objectives<br/>02 / First four hours<br/>03 / Blast radius<br/>04 / Tooling<br/>05 / Evidence priorities<br/>06 / Validate containment<br/>07 / Recovery gates</aside>
      <article className="prose">
        <p>“Isolate everything” sounds decisive until the affected network supports patient care, manufacturing, identity, communications, or the systems needed to recover. Waiting for certainty is equally dangerous: encryption can continue, privileged access can spread, and backup infrastructure can be damaged while the team debates scope.</p>
        <div className="callout"><strong>Operating principle:</strong> Make the smallest action that materially reduces attacker capability, measure the result, and expand containment when the evidence requires it.</div>

        <h2>1. Define the containment objectives</h2>
        <p>Containment is not one action. The incident commander and technical leads should state which attacker capability each action is intended to remove:</p>
        <ul><li>Stop active encryption and destructive execution.</li><li>Interrupt lateral movement and remote administration.</li><li>Invalidate compromised human and machine identities.</li><li>Protect identity, virtualization, security-management, and backup control planes.</li><li>Preserve volatile and centralized evidence.</li><li>Maintain essential safety and business functions.</li></ul>
        <p>Every decision record should identify the affected scope, expected security benefit, operational impact, approver, assumptions, validation signal, and next review time.</p>

        <h2>2. Work the first four hours deliberately</h2>
        <p>These windows are prioritization guidance, not universal service-level targets. Active encryption, safety implications, or control-plane compromise can justify immediate escalation.</p>
        <table className="decision-table"><thead><tr><th>WINDOW</th><th>TECHNICAL PRIORITIES</th><th>DECISION OUTPUT</th></tr></thead><tbody>
          <tr><td>0–15 min</td><td>Validate the signal in EDR and target-system logs; open the incident record; assign command; preserve UTC timestamps; identify the first affected host, user, and process tree.</td><td>Confirmed incident, initial scope, authority to act</td></tr>
          <tr><td>15–30 min</td><td>Isolate confirmed hosts; disable or restrict affected identities; revoke active sessions; block known infrastructure; protect EDR, identity, virtualization, and backup consoles.</td><td>Initial attacker capability reduced</td></tr>
          <tr><td>30–60 min</td><td>Hunt remote execution and privileged authentication; identify encryption paths; restrict SMB, RDP, WinRM, WMI, SSH, VPN, and management channels according to observed behavior.</td><td>Propagation paths mapped and segmented</td></tr>
          <tr><td>1–4 hr</td><td>Acquire priority evidence; rotate emergency credentials from clean systems; validate backup immutability; establish clean administration; prepare staged recovery and continuous hunting.</td><td>Stable containment state with recovery options</td></tr>
        </tbody></table>

        <h2>3. Contain the blast radius, not just the endpoint</h2>
        <p>The visibly encrypted host is often the least important part of the architecture. Responders must determine whether the attacker can still operate through identity, administration, virtualization, network, or backup control planes.</p>
        <figure className="architecture-flow"><img src="/diagrams/ransomware-containment-architecture.svg" alt="Ransomware containment reference architecture separating workload, control, and recovery planes with attacker paths and containment choke points"/><figcaption>REFERENCE ARCHITECTURE / BLAST RADIUS AND CONTAINMENT CHOKE POINTS</figcaption></figure>
        <p>The numbered cuts are ordered by urgency, not organizational ownership: isolate active execution, revoke the authority behind it, protect recovery, segment propagation paths, then establish a clean recovery enclave.</p>

        <h2>4. Use the tools as control surfaces</h2>
        <table className="decision-table"><thead><tr><th>CAPABILITY</th><th>CONTROL SURFACES</th><th>VALIDATION EVIDENCE</th></tr></thead><tbody>
          <tr><td>Endpoint containment</td><td>EDR isolation, host firewall, NAC, switch-port controls</td><td>EDR heartbeat retained; prohibited connections fail; no new malicious child processes</td></tr>
          <tr><td>Identity containment</td><td>AD/IdP disablement, session revocation, conditional access, privileged-role restriction</td><td>Authentication failures, token revocation, no new ticket or session issuance</td></tr>
          <tr><td>Network segmentation</td><td>Firewall, VLAN, NAC, VPN, DNS, proxy, egress controls</td><td>Flow logs and firewall denies match the intended cut</td></tr>
          <tr><td>Investigation</td><td>SIEM, EDR telemetry, Sysmon, Windows Event Logs, Velociraptor, KAPE, osquery</td><td>Correlated process, identity, network, and persistence timeline</td></tr>
          <tr><td>Cloud and control plane</td><td>Cloud audit logs, sign-in telemetry, workload identity, virtualization administration</td><td>No unauthorized control-plane changes or continuing privileged sessions</td></tr>
          <tr><td>Backup protection</td><td>Immutability controls, vault isolation, administrative audit, credential separation</td><td>Restore points intact; deletion paths blocked; clean administrators established</td></tr>
        </tbody></table>
        <p>Console success messages are not proof of containment. Validate the effect in downstream telemetry and the target system. A host reported as isolated may retain management exceptions; a password reset may leave sessions, Kerberos tickets, OAuth grants, API keys, certificates, and service credentials active.</p>

        <h2>5. Preserve evidence according to volatility</h2>
        <h3>Collect quickly when time and safety permit</h3><ul><li>Memory and active network connections</li><li>Process trees, loaded modules, and command execution</li><li>Logged-on sessions and token or ticket state</li><li>EDR live-response artifacts and volatile malware configuration</li><li>Active shares, remote sessions, and encryption handles</li></ul>
        <h3>Protect centralized evidence</h3><ul><li>Identity provider and directory audit logs</li><li>SIEM and EDR event stores</li><li>Cloud and virtualization control-plane events</li><li>Firewall, DNS, proxy, VPN, and NAC telemetry</li><li>Backup-console and immutable-storage audit logs</li></ul>
        <p>Do not delay an urgent containment action merely to collect perfect evidence. Record what was lost, why the action was necessary, and which alternative evidence sources remain.</p>

        <h2>6. Measure whether containment worked</h2>
        <p>Do not declare containment because encryption appears to have stopped. Define an observation window and require multiple independent signals:</p>
        <ul><li>No newly encrypted or impacted hosts during the observation period.</li><li>No continuing malicious remote execution or lateral movement.</li><li>Compromised sessions, credentials, and delegated access are invalidated.</li><li>Administrative protocols and affected trust paths are restricted.</li><li>Backup systems are isolated, immutable, and independently administered.</li><li>EDR and centralized logging remain healthy across the contained scope.</li><li>Known persistence is removed or rendered unable to execute.</li><li>Responders have clean identities, workstations, and communication channels.</li></ul>
        <div className="callout"><strong>Reassessment rule:</strong> If a new affected host, privileged authentication, destructive event, or backup-control anomaly appears, reopen the containment decision and expand the cut.</div>

        <h2>7. Use technical recovery gates</h2>
        <p>Reconnection is a controlled change, not the end of isolation. Require evidence that:</p>
        <ol><li>The initial access path and demonstrated propagation paths are addressed.</li><li>Persistence is removed and high-risk identities are reset from trusted systems.</li><li>Restoration sources and golden images are validated.</li><li>Monitoring is active before network access is restored.</li><li>Recovery occurs in stages: identity and management, core dependencies, critical applications, then broader user access.</li><li>Rollback to isolation remains possible at every stage.</li><li>The accountable business owner accepts documented residual risk.</li></ol>
        <p>Ransomware containment remains a business decision because every technical cut changes operational risk. A mature playbook makes that tradeoff explicit while giving responders the architecture, telemetry, authority, and verification criteria to act under pressure.</p>
      </article>
    </div>
  </main>;
}
