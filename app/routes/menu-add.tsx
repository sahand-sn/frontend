import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [{ title: "Add Menu" }];
}

export default function AddResumePage() {
  return <p>add menu</p>;
}
