import type { Metadata } from "next";
import { OperationalPlaybook, playbooks } from "../_components/OperationalPlaybook";
const playbook=playbooks["business-email-compromise"];
export const metadata: Metadata = {
  alternates: { canonical: "/playbooks/business-email-compromise/" }, title: "Business Email Compromise Playbook", description: playbook.summary };
export default function Page(){ return <OperationalPlaybook playbook={playbook}/>; }
