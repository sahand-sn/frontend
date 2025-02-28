import type { MetaArgs } from "react-router";
import { ResumeForm } from "../components/resume/form";

export function meta({}: MetaArgs) {
  return [{ title: "Add Resume" }];
}

export default function AddResumePage() {
  return <ResumeForm />;
}
