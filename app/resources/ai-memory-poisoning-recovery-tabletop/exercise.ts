// Public exercise material. All people, records, and events in the scenario are fictional.
export const exercise = {
  "setup": "Reserve 60 minutes and open a private decision log. Read only the scenario and the current evidence card aloud. Keep the facilitator notes out of view until the debrief. If participants ask for evidence the card does not contain, record who would retrieve it and when. Treat it as unknown for the current decision.",
  "roles": [
    [
      "Incident commander",
      "Containment scope, service decisions, escalation, and final authorization"
    ],
    [
      "AI platform owner",
      "Write suspension, rebuild, route switch, rollback, and capability testing"
    ],
    [
      "Data owner",
      "Approved source versions, tenant boundaries, and access-control verification"
    ],
    [
      "Security approver",
      "Evidence integrity, impact assessment, recovery gates, and approval recommendation"
    ],
    [
      "Service owner",
      "User impact, degraded mode, and acceptance of operational risk"
    ],
    [
      "Facilitator and scribe",
      "Evidence releases, timekeeping, decisions, and follow-up"
    ]
  ],
  "solo": "For a solo run, read each card, record your decision and the evidence each role would need, then compare with the facilitator notes. Before starting, agree on a rollback objective. The worked example uses five minutes. This is an exercise target that teams should adjust to their own service objectives.",
  "briefing": [
    "A fictional support assistant serves two customer tenants, Blue and Green. It reads approved knowledge and scoped conversational memory. A background job summarizes past sessions, and a connector can propose support-ticket exports subject to independent approval. The vector index, summary store, cache, and connector audit log are versioned separately. Support staff can switch the assistant to a stateless mode that reads approved knowledge and disables export.",
    "At 09:06 UTC, Blue reports that a fictional export preference appeared in a new session. The user says they never set it. The assistant had read persistent memory. The earliest known suspect write is 08:40 UTC. Earlier exposure remains unbounded until evidence narrows it."
  ],
  "cards": [
    {
      "time": "0–10 min",
      "id": "E1",
      "evidence": "Trace T-301 for Blue reads memory M-17, written at 08:40 UTC. The agent proposes export P-41. Its trace ends at proposal and lacks a downstream receipt.",
      "question": "Which capabilities can you suspend now? What would tell you whether the export actually happened?"
    },
    {
      "time": "10–20 min",
      "id": "E2",
      "evidence": "M-17 is removed from active use. A new session still reads cached result C-22. Summary S-9, derived from M-17, is also retrieved in a Green trace. Green's user-visible output is missing.",
      "question": "Which derivatives and tenants enter scope? What can you say about Green's actual exposure?"
    },
    {
      "time": "20–30 min",
      "id": "E3",
      "evidence": "Snapshot A was taken at 08:55 UTC and lacks access-control digests. Snapshot B was taken at 08:00 UTC and has a signed manifest. An independently approved source registry records source versions, digests, owners, and expected tenant permissions.",
      "question": "Which sources can you rebuild from, and how will you establish trust in them?"
    },
    {
      "time": "30–45 min",
      "id": "E4",
      "evidence": "Candidate R2 answers approved test questions correctly. After a simulated restart, canary trace T-404 retrieves S-9 again. The rollback target is stateless mode.",
      "question": "Who stops promotion, what gets rolled back, and what evidence must survive the change?"
    },
    {
      "time": "45–55 min",
      "id": "E5",
      "evidence": "Candidate R3 passes isolation and restart tests. Of 20 canary requests, 19 include a recorded policy decision. The external connector lacks a complete audit record for the original incident window. The service owner asks to restore exports.",
      "question": "Which capabilities are eligible for restoration? What conditions must be met before you widen service?"
    }
  ],
  "notes": [
    {
      "title": "Contain and preserve (E1)",
      "response": "Freeze affected memory writes, summarization and retry jobs, and high-impact tools. Use stateless mode if its approved sources are independent of the affected stores. Preserve the original memory version, timestamps, trace IDs, policy events, and connector audit records in a restricted evidence location. Record P-41 as proposed with an unknown execution outcome. Ask for the target system's delivery record, connector audit events, and receipts correlated to the same request and time window."
    },
    {
      "title": "Scope downstream exposure (E2)",
      "response": "Map M-17 to its vector and any chunks, cache entries, summaries, retrievals, outputs and tool actions. Block suspect descendants from serving. Preserve copies for investigation. Green's trace confirms cross-tenant retrieval of the summary and warrants investigation. A missing output leaves user-visible disclosure unknown. Expand containment when lineage is incomplete and record what remains unknown."
    },
    {
      "title": "Select a clean source (E3)",
      "response": "Hold A for evidence. B's signature establishes artifact identity and integrity if verified. Its age and signature alone cannot establish that its contents are clean or permission checks still hold. Compare selected records, hashes, owners, and access controls with independent approved versions. Discard unverifiable entries from the candidate, rebuild in a new versioned collection, and keep stateless mode available for rollback."
    },
    {
      "title": "Stop promotion (E4)",
      "response": "The commander calls a hold and the platform owner switches routing back to the verified stateless target. Preserve the current and previous alias, canary trace, candidate version, warm-up and restart job events, and rollback timing. Keep writes and exports disabled. Identify the path that resurrected S-9 and rerun restart, cache warm-up, recovery, and isolation checks before promoting a corrected candidate."
    },
    {
      "title": "Decide by capability (E5)",
      "response": "Keep the persistent-memory candidate on hold because one request lacks policy evidence. Keep exports disabled while the tool authorization and logging gates remain open. Maintain verified stateless service if available. The missing historical connector record is a separate impact question. Document the uncertainty and assign an owner before considering any residual-risk decision. Once the canary gates pass, the commander can authorize staged restoration with approval from security, data, and service owners."
    }
  ],
  "gates": [
    [
      "Provenance and access",
      "Versioned candidate manifest, independently approved source digests, and matching current tenant permissions",
      "Unknown source, digest mismatch, or permission discrepancy"
    ],
    [
      "Isolation and persistence",
      "Zero known suspect IDs or derivatives in synthetic checks, zero cross-tenant results, and no reappearance after cache warm-up, restart, and restore",
      "Any suspect record or cross-tenant result"
    ],
    [
      "Observability",
      "Every canary trace identifies the candidate version, tenant, retrieval and memory operations, and policy decision",
      "Missing or uncorrelated audit evidence"
    ],
    [
      "Tool authorization",
      "Mock tools reject unauthorized actions. Approved actions match reviewed scope and correlate with a target-system receipt.",
      "An out-of-policy action or unexplained evidence gap"
    ],
    [
      "Rollback",
      "Route restored within the agreed objective. Traffic reaches the verified target, and writes and high-impact tools stay disabled.",
      "Bad routing, deadline missed, or a restricted capability re-enabled"
    ]
  ],
  "decisions": [
    [
      "E4, minute 36",
      "Hold R2 and return to stateless mode",
      "T-404 retrieved S-9 after restart. Cause still unknown.",
      "Platform owner, authorized by commander",
      "Within the exercise's five-minute rollback target"
    ],
    [
      "E5, minute 49",
      "Hold R3 and keep exports disabled",
      "19 of 20 policy decisions recorded. Require 20 of 20 on an agreed rerun. Historical export delivery remains unknown.",
      "Security approver and connector owner",
      "Before the next promotion review"
    ]
  ]
};
