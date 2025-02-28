import type { MetaArgs } from "react-router";
import Signup from "../components/signup";

export function meta({}: MetaArgs) {
  return [{ title: "Signup" }];
}

export default function SignupPage() {
  return <Signup />;
}
