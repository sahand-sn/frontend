import type { MetaArgs } from "react-router";
import Dashboard from "../components/dashboard";

export function meta({}: MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function DashboardPage() {
  return <Dashboard />;
}
