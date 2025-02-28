import type { MetaArgs } from "react-router";
import Login from "../components/login";

export function meta({}: MetaArgs) {
  return [{ title: "Login" }];
}

export default function LoginPage() {
  return <Login />;
}
