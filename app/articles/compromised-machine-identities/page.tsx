import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Incident response for compromised machine identities",
  description: "A technical response guide for containing compromised service accounts, workload identities, API keys, OAuth applications, certificates, and delegated tokens.",
};

const containmentSteps = [
  ["01", "Stop minting", "Disable the principal or trust path"],
  ["02", "Revoke authority", "Terminate tokens, sessions, and grants"],
  ["03", "Deny resources", "Enforce IAM, gateway, and resource controls"],
  ["04", "Rotate cleanly", "Replace credentials after the control plane is trusted"],
];

export default function Article() {
  return <main className="article-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link><nav aria-label="Primary navigation"><Link href="/#knowledge">Knowledge</Link><a href="/IncidentResponse/">Framework</a><Link href="/#playbooks">Playbooks</Link><Link href="/articles">Articles</Link></nav><Link className="header-cta" href="/articles">All field notes ↗</Link></header>
    <section className="article-head"><p className="eyebrow">FIELD NOTE 010 · IDENTITY SECURITY · 27 SEP 2026</p><h1>Incident response for compromised machine identities</h1><p className="dek">A service account does not call the help desk when it is compromised. Responders must reconstruct the incident from credentials, token issuance, role assignments, workload activity, and the systems capable of minting additional authority.</p></section>
    <div className="article-body">
      <aside className="toc"><b>IN THIS NOTE</b>01 / Recognition<br/>02 / Identity graph<br/>03 / Containment<br/>04 / Rotation<br/>05 / Persistence<br/>06 / Evidence<br/>07 / Recovery<br/>08 / Engineering</aside>
      <article className="prose">
        <p>An API key appears in a public repository. A service principal authenticates from an unfamiliar environment. A Kubernetes workload starts requesting tokens for resources it has never used.</p>
        <p>These can look like simple credential incidents, but rotating one secret is rarely sufficient.</p>
        <p>A machine identity is a principal used by software rather than a person. Its authority may involve a service account, workload or managed identity, API key, OAuth application, certificate, cloud role session, or delegated token.</p>
        <div className="callout"><strong>Principal ≠ credential ≠ token ≠ permission.</strong> The principal is the identity. A credential proves control of it. A token carries temporary authority. Roles, scopes, grants, and resource policies determine what that authority can reach.</div>
        <p>Deleting a credential does not necessarily invalidate tokens already issued. Revoking a token does not remove a malicious certificate added to the principal. Disabling a workload does not eliminate a second identity created for persistence.</p>
        <p>The response objective is not merely to replace a secret. It is to stop the attacker from authenticating, minting new authority, reaching protected resources, delegating access, or rebuilding persistence.</p>

        <h2>Recognizing machine-identity abuse</h2>
        <p>Traditional user detections—impossible travel, suspicious MFA prompts, or interactive sign-ins—may provide little value when the principal is software. Look instead for changes in how the identity is created, authenticated, authorized, and used.</p>
        <h3>Identity and credential signals</h3>
        <ul><li>A new password, certificate, federated credential, or API key.</li><li>Credential creation outside the approved deployment pipeline.</li><li>A certificate thumbprint absent from the configuration baseline.</li><li>Authentication from an unexpected network, cloud, region, or workload.</li><li>Token requests with an unfamiliar issuer, audience, scope, or subject.</li><li>Tokens minted after the expected workload was stopped.</li><li>A sudden increase in role assumptions or token exchanges.</li><li>Changes to application owners, redirect URIs, permissions, or consent.</li><li>A disabled identity being re-enabled.</li><li>A replacement identity with a similar display name or purpose.</li></ul>
        <p>Microsoft recommends examining service-principal sign-ins, credential changes, app-role assignments, consent grants, redirect URIs, custom roles, and affected resources when investigating compromised applications. <a href="https://learn.microsoft.com/en-us/security/operations/incident-response-playbook-compromised-malicious-app" rel="noopener noreferrer">Microsoft Security Operations ↗</a></p>
        <h3>Resource-plane signals</h3>
        <ul><li>Access to a new subscription, account, vault, database, or tenant.</li><li>Resource enumeration followed by bulk reads.</li><li>Secret retrieval outside the normal deployment window.</li><li>Privilege or policy modifications.</li><li>New automation jobs, functions, queues, webhooks, or scheduled tasks.</li><li>Requests using a retired key identifier.</li><li>Administrative changes made through an unexpected API or tool.</li><li>Unusual access volume from an otherwise legitimate workload.</li></ul>
        <div className="callout"><strong>Detection principle:</strong> The strongest alert may not be “this credential was used.” It may be “this identity performed an action outside its established workload profile.”</div>

        <h2>Start with an identity graph</h2>
        <p>Before changing the environment, map the principal and every path through which it can obtain, exercise, or delegate authority.</p>
        <ul><li>Immutable principal and application identifiers.</li><li>Tenant, account, subscription, cluster, and namespace.</li><li>Credential identifiers, creation dates, and expiration dates.</li><li>Certificate thumbprints and key identifiers—never private material.</li><li>Workloads and deployment pipelines using the identity.</li><li>Direct and inherited roles, group memberships, permissions, and scopes.</li><li>Consent grants and resource-based policies.</li><li>Impersonation and token-creation privileges.</li><li>Vaults and secret stores accessible to the identity.</li><li>Federated issuers, audiences, subjects, and trust rules.</li><li>Active sessions and maximum token lifetimes.</li><li>Resources contacted before and after the first suspicious event.</li></ul>
        <div className="callout"><strong>Do not ask only where the credential is stored.</strong> Ask what the identity can reach, impersonate, delegate, create, or use to mint another identity.</div>

        <h2>Identity-containment architecture</h2>
        <p>Containment must operate at multiple control points. No single identity-provider action is reliable enough for every platform and every previously issued token.</p>
        <figure className="identity-containment" aria-label="Four control points for containing a compromised machine identity">
          <div className="identity-source"><small>AUTHORITY PATH</small><strong>Workload / CI/CD / delegated application</strong><span>federation → issuer → principal → session → resource</span></div>
          <div className="containment-line">{containmentSteps.map(([n,title,detail]) => <div className="containment-step" key={n}><i>{n}</i><strong>{title}</strong><span>{detail}</span></div>)}</div>
          <div className="identity-targets"><span>VAULTS</span><span>DATA</span><span>CLOUD</span><span>SAAS</span></div>
          <figcaption>IDENTITY CONTAINMENT / CONTROL THE ISSUER, SESSION, ENFORCEMENT POINT, AND CREDENTIAL LIFECYCLE</figcaption>
        </figure>
        <p>Responders may need to disable the principal, remove its federation rule, revoke active tokens, apply an explicit deny at the resource plane, stop the workload, and only then rotate its credentials.</p>

        <h2>The containment sequence</h2>
        <h3>0–15 minutes: preserve identifiers and stop new authority</h3>
        <p>Capture principal and application IDs, credential IDs, thumbprints, roles, groups, consent grants, federation configuration, recent token events, source workload, deployment pipeline, and relevant resource activity before deleting anything.</p>
        <p>Then prevent the principal from minting new authority: disable the account or service principal, remove or narrow workload federation, suspend the OAuth application, detach the managed identity, stop the workload, or block the identity at the gateway.</p>
        <p>Microsoft recommends disabling sign-in for a compromised application to create investigation time before removing the object or replacing every credential. <a href="https://learn.microsoft.com/en-us/security/operations/incident-response-playbook-compromised-malicious-app" rel="noopener noreferrer">Microsoft Security Operations ↗</a></p>

        <h3>15–30 minutes: deny access at the resource plane</h3>
        <p>Assume previously issued tokens may continue working. Apply explicit deny policies, resource-policy changes, gateway restrictions, vault access removal, private-endpoint controls, account quarantine, or database login disablement.</p>
        <p>AWS notes that temporary credentials usually remain valid until they expire unless their permissions are removed or revoked. Policy changes may also take several minutes to propagate. <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_control-access_disable-perms.html" rel="noopener noreferrer">AWS IAM documentation ↗</a></p>

        <h3>30–60 minutes: revoke derived authority</h3>
        <p>Invalidate access and refresh tokens, cloud role sessions, application sessions, OAuth grants, delegated permissions, cached gateway credentials, impersonation tokens, and downstream SaaS sessions.</p>
        <p>OAuth revocation can invalidate a token and, depending on the authorization server, related tokens or the underlying grant. Propagation delays and unsupported access-token revocation can leave residual access until expiration. <a href="https://datatracker.ietf.org/doc/html/rfc7009" rel="noopener noreferrer">RFC 7009 ↗</a></p>
        <p>Verify revocation at the resource server. A successful identity-provider response does not prove that every downstream service has stopped accepting the token.</p>

        <h3>1–4 hours: rotate and redeploy</h3>
        <ol><li>Create the replacement credential through an approved administrative path.</li><li>Deliver it through the managed secret store—not email, chat, or an incident ticket.</li><li>Update one consumer or workload group at a time.</li><li>Record which key identifier each consumer uses.</li><li>Validate expected authentication and resource access.</li><li>Disable and then remove the old credential.</li><li>Search for continued use of the retired identifier.</li><li>Redeploy affected workloads from trusted artifacts.</li></ol>
        <p>Immediately rotating every related secret can create a widespread outage, obscure which credential was used, and leave an attacker-controlled token or secondary credential untouched.</p>

        <h2>Containment by identity type</h2>
        <table className="decision-table"><thead><tr><th>IDENTITY OR CREDENTIAL</th><th>IMMEDIATE CONTAINMENT</th><th>REQUIRED FOLLOW-UP</th></tr></thead><tbody>
          <tr><td>Service-account password</td><td>Disable sign-in or apply a deny policy</td><td>Reset password, update consumers, inspect roles and recently added credentials</td></tr>
          <tr><td>API key</td><td>Disable or restrict the key at the provider</td><td>Issue replacement, update clients, verify old-key use reaches zero</td></tr>
          <tr><td>OAuth application</td><td>Disable the service principal and revoke grants</td><td>Inspect owners, consents, app roles, redirect URIs, certificates, and secrets</td></tr>
          <tr><td>Access or refresh token</td><td>Revoke the token or authorization grant</td><td>Test resource-server rejection and account for propagation and token lifetime</td></tr>
          <tr><td>Cloud role session</td><td>Apply explicit deny and revoke sessions where supported</td><td>Correct the trust policy and investigate derived sessions</td></tr>
          <tr><td>Managed identity</td><td>Stop the workload, detach the identity, or remove permissions</td><td>Inspect role assignments and redeploy from a trusted image</td></tr>
          <tr><td>Workload federation</td><td>Remove or narrow issuer, subject, and audience trust</td><td>Rotate external credentials and review accepted identity claims</td></tr>
          <tr><td>Client certificate</td><td>Disable the binding or trust and revoke when supported</td><td>Replace the certificate, remove its thumbprint, inspect registered keys</td></tr>
          <tr><td>Signing key</td><td>Stop the issuer or remove the key from trust</td><td>Rotate signing material and invalidate signed artifacts or tokens</td></tr>
        </tbody></table>
        <p>Managed identities and federated workloads require special attention because there may be no long-lived secret to rotate. The containment target is the trust relationship, role assignment, workload, or token issuer.</p>
        <p>Google recommends short-lived service-account credentials and workload identity federation over user-managed service-account keys. Some services may not record which identity created a short-lived credential, making surrounding workload and resource logs important. <a href="https://cloud.google.com/iam/docs/service-account-creds" rel="noopener noreferrer">Google Cloud IAM documentation ↗</a></p>

        <h2>Hunt for persistence, not only activity</h2>
        <h3>Identity configuration</h3>
        <ul><li>Additional passwords, API keys, certificates, or federated credentials.</li><li>Recently created or lookalike service accounts and applications.</li><li>New application owners, roles, group memberships, or consent grants.</li><li>Modified redirect URIs and custom roles built around the identity.</li></ul>
        <h3>Federation and delegation</h3>
        <ul><li>Added OIDC issuers or broadened subject and audience patterns.</li><li>Repository or branch wildcards in CI/CD trust policies.</li><li>Token-creator and impersonation permissions.</li><li>Delegation chains, cross-account trust, and new verification keys.</li></ul>
        <h3>Workloads and resource policies</h3>
        <ul><li>Scheduled functions, workflows, containers, and automation rules.</li><li>Modified manifests, infrastructure-as-code, pipeline variables, or startup scripts.</li><li>Credentials copied into backups, logs, artifacts, or support bundles.</li><li>Vault, storage, database, messaging, SaaS, and gateway policies granting access independently of central IAM.</li></ul>
        <p>Persistence frequently survives because responders clean the identity provider but do not inspect the resource policy—or clean the resource policy while leaving the token issuer compromised.</p>

        <h2>Preserve evidence without preserving the secret</h2>
        <p>Correlate immutable principal and application IDs, credential key IDs, certificate thumbprints, issuer, subject, audience, token or session ID, scopes, roles, creation and expiration times, source workload, deployment ID, request ID, target resource, action, and result.</p>
        <pre><code>principal_id · application_id · credential_key_id{"
"}token_issuer · token_subject · token_audience · session_id{"
"}issued_at · expires_at · source_ip · workload_instance{"
"}deployment_id · request_id · target_resource · action · result</code></pre>
        <p>Do not place passwords, private keys, API keys, bearer tokens, or reusable session cookies in case notes. When correlation requires a sensitive value, record a cryptographic fingerprint or the provider’s non-secret credential identifier.</p>
        <p>Normalize identity-provider, cloud, workload, gateway, and target-system events to UTC while retaining each source’s original timestamp and ingestion time.</p>

        <h2>Recovery should be staged</h2>
        <ol><li><strong>Denied:</strong> The identity cannot authenticate or reach resources.</li><li><strong>Canary:</strong> A replacement receives minimal read-only access in a controlled workload.</li><li><strong>Limited:</strong> Required production permissions return for a small workload set.</li><li><strong>Operational:</strong> Normal capacity returns with enhanced monitoring.</li><li><strong>Hardened:</strong> Temporary controls become durable engineering and policy changes.</li></ol>
        <p>Before full recovery, confirm the administrative and deployment paths are trusted; every credential and trust path has an owner; unauthorized credentials, grants, and roles are removed; sessions are revoked or expired; workloads were rebuilt; resource policies were reviewed; retired credential use has stopped; high-risk activity was investigated; and a rollback method exists.</p>

        <h2>Engineering improvements after the incident</h2>
        <ul><li>Use workload federation or managed identities instead of static keys.</li><li>Prefer short-lived, audience-bound credentials.</li><li>Separate identities by workload and environment.</li><li>Apply minimal roles with resource-level restrictions.</li><li>Automate credential inventory and ownership.</li><li>Alert on credential, consent, federation, and role changes.</li><li>Centralize identity and resource-plane logging.</li><li>Record non-secret key identifiers in authentication telemetry.</li><li>Test emergency deny controls before an incident.</li><li>Exercise rotation procedures against real dependency maps.</li><li>Enforce trust and role configuration through infrastructure-as-code.</li><li>Prevent secrets from entering repositories, logs, and build artifacts.</li></ul>
        <p>Short-lived credentials limit exposure, but they do not eliminate the need for revocation, resource enforcement, or logging. If an attacker can continuously request new tokens, a one-hour lifetime provides little protection.</p>

        <h2>Responder checklist</h2>
        <ul className="field-checklist"><li>Identify the principal, credentials, sessions, and trust relationships.</li><li>Preserve credential identifiers, role assignments, grants, and recent logs.</li><li>Stop new token or credential issuance.</li><li>Apply resource-plane denial and revoke delegated authority.</li><li>Stop or isolate the originating workload.</li><li>Enumerate reachable resources and privilege-escalation paths.</li><li>Extend the investigation through the maximum token lifetime.</li><li>Remove unauthorized credentials, consent, roles, federation, and resource policies.</li><li>Rebuild affected workloads from trusted artifacts.</li><li>Restore access in stages and confirm retired credentials are no longer used.</li></ul>

        <h2>Closing perspective</h2>
        <p>Human-account incidents are often organized around the user’s session. Machine-identity incidents have a wider shape: the principal, workload, credential, token issuer, trust policy, and every resource that accepts the resulting authority.</p>
        <p>That is why “rotate the key” is not an incident-response strategy.</p>
        <div className="callout"><strong>Containment is complete only when</strong> the compromised identity can no longer authenticate, obtain new authority, use previously issued authority, delegate access, or recreate its path into the environment.</div>
      </article>
    </div>
  </main>;
}
