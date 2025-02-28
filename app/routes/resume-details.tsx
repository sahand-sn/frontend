import type { MetaArgs } from "react-router";
import { ResumeView } from "../components/resume/details";

export function meta({}: MetaArgs) {
  return [{ title: "Resume Details" }];
}

export default function ViewResumePage() {
  return <ResumeView />;
}
