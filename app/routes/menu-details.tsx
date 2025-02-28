import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [{ title: "Menu Details" }];
}

export default function ViewMenuPage() {
  return <p>menu details</p>;
}
