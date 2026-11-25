import type { Metadata } from "next";
import Link from "next/link";
import { exercise } from "./exercise";
import styles from "./tabletop.module.css";

const recoveryArticle = "/articles/recovering-ai-memory-and-vector-stores/";

export const metadata: Metadata = {
  title: "AI memory poisoning recovery tabletop",
  description: "A 60-minute incident response exercise for deciding how to contain, rebuild, and safely restore AI memory after suspected poisoning.",
  alternates: { canonical: "/resources/ai-memory-poisoning-recovery-tabletop/" },
};

export default function TabletopPage() {
  return (
    <main id="main-content" className="guide-page" tabIndex={-1}>
      <header className="site-header">
        <Link className="brand" href="/">LR INFOSEC.LAB</Link>
        <nav aria-label="Primary navigation">
          <a href="/IncidentResponse/">Framework</a>
          <Link href="/resources/">Resources</Link>
          <Link href="/articles/">Articles</Link>
        </nav>
        <Link className="header-cta" href="/resources/">Responder resources</Link>
      </header>

      <section className="guide-hero" aria-labelledby="tabletop-title">
        <p className="eyebrow">INCIDENT RESPONSE EXERCISE</p>
        <h1 id="tabletop-title">AI memory poisoning recovery tabletop</h1>
        <p className="dek">Decide what to suspend, which state to trust, and when to restore each capability after an assistant recalls something a user never told it.</p>
        <p className={styles.format}>60 minutes · Solo or team · Synthetic evidence</p>
        <nav className={styles.jumpLinks} aria-label="Tabletop sections">
          <a href="#participant-handout">Participant handout</a>
          <a href="#facilitator-guide">Facilitator guide</a>
        </nav>
      </section>

      <div className={`guide-content ${styles.content}`}>
        <section className="guide-section" id="participant-handout" aria-labelledby="participant-title">
          <h2 id="participant-title">Participant handout</h2>
          <div className={styles.reading}>
            <p>Use this as a discussion exercise. All tenants, identifiers, and events are fictional. Record each decision, the evidence behind it, who owns it, and when to recheck it.</p>
            {exercise.briefing.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <h3>Timed evidence cards</h3>
          <p>Open each card when its time window begins. The last five minutes are for the debrief.</p>
          <div className={styles.cards}>
            {exercise.cards.map(({ time, id, evidence, question }, index) => (
              <details key={id} open={index === 0}>
                <summary><span>{time}</span> {id} · {["Contain and preserve", "Scope the spread", "Choose a recovery source", "Rehearse rollback", "Decide what can reopen"][index]}</summary>
                <div>
                  <p>{evidence}</p>
                  <p><strong>Decision prompt</strong> {question}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="guide-section" id="facilitator-guide" aria-labelledby="facilitator-title">
          <h2 id="facilitator-title">Facilitator guide</h2>
          <p className="intro">Use this section to run the session and compare decisions during the debrief.</p>
          <div className={styles.reading}>
            <p>{exercise.setup}</p>
            <p>{exercise.solo}</p>
          </div>
          <dl className={styles.roles}>
            {exercise.roles.map(([role, duty]) => <div key={role}><dt>{role}</dt><dd>{duty}</dd></div>)}
          </dl>
          <div className={styles.cards}>
            <details>
              <summary>Reveal expected decisions and worked examples</summary>
              <div>
                <ol className="operator-list">
                  {exercise.notes.map(({ title, response }) => <li key={title}><strong>{title}.</strong> {response}</li>)}
                </ol>
                <h3>Sample decision log</h3>
                {exercise.decisions.map(([card, decision, evidence, owner, recheck]) => (
                  <p key={card}><strong>{card} · {decision}.</strong> {evidence} {owner} owns the follow-up. Recheck {recheck.charAt(0).toLowerCase() + recheck.slice(1)}.</p>
                ))}
              </div>
            </details>
          </div>
          <h3>Recovery criteria</h3>
          <p>Agree on the observation window and rollback target before a canary. The exercise example uses a five-minute rollback target. Start with offline replay, then a synthetic canary, then limited read-only service. Restore memory writes and high-impact tools after their separate checks pass.</p>
          <dl className={styles.criteria}>
            {exercise.gates.map(([gate, evidence, trigger]) => (
              <div key={gate}><dt>{gate}</dt><dd><strong>Pass.</strong> {evidence}</dd><dd><strong>Hold or roll back.</strong> {trigger}</dd></div>
            ))}
          </dl>
          <h3>Score and debrief</h3>
          <ul className="operator-list">
            <li><strong>0</strong> · No decision or an unsafe decision.</li>
            <li><strong>1</strong> · Safe decision with missing evidence or ownership.</li>
            <li><strong>2</strong> · Safe decision with specific evidence, an owner, and a recheck condition.</li>
          </ul>
          <p>Score each of the five cards out of two. Mark the exercise incomplete if any decision scores zero. Record up to three corrective actions, each with an owner, due date, and evidence of closure. Keep completed logs and real incident details in your private incident record.</p>
          <p className={styles.scope}>The tabletop rehearses team decisions. Validate technical controls through separate tests against an agreed sample and observation window.</p>
        </section>

        <section className="guide-section" aria-labelledby="sources-title">
          <h2 id="sources-title">Further reading</h2>
          <ul className={`operator-list ${styles.sources}`}>
            <li><Link href={recoveryArticle}>Recovery criteria for compromised AI memory and vector stores</Link></li>
            <li><a href="https://csrc.nist.gov/pubs/sp/800/61/r3/final">NIST SP 800-61 Rev. 3 incident response recommendations</a></li>
            <li><a href="https://learn.microsoft.com/en-us/security/zero-trust/catalog-ai-defense-capabilities/input-context-retrieval-hygiene">Microsoft guidance on input, context, and retrieval hygiene</a></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
