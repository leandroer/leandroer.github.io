import type { Metadata } from "next";
import { OperationalPlaybook, playbooks } from "../_components/OperationalPlaybook";
export const metadata: Metadata = { title: "Ransomware Response Playbook", description: playbooks.ransomware.summary };
export default function Page(){ return <OperationalPlaybook playbook={playbooks.ransomware}/>; }
