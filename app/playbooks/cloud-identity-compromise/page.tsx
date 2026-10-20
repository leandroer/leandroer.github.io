import type { Metadata } from "next";
import { OperationalPlaybook, playbooks } from "../_components/OperationalPlaybook";
const playbook=playbooks["cloud-identity-compromise"];
export const metadata: Metadata = {
  alternates: { canonical: "/playbooks/cloud-identity-compromise/" }, title: "Cloud Identity Compromise Playbook", description: playbook.summary };
export default function Page(){ return <OperationalPlaybook playbook={playbook}/>; }
