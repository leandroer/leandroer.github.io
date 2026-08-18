import type { Metadata } from "next";
import { OperationalPlaybook, playbooks } from "../_components/OperationalPlaybook";
const playbook=playbooks["data-exfiltration"];
export const metadata: Metadata = { title: "Data Exfiltration Response Playbook", description: playbook.summary };
export default function Page(){ return <OperationalPlaybook playbook={playbook}/>; }
