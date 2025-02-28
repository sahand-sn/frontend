import type { MetaArgs } from "react-router";
import AddMenu from "~/components/add-menu";

export function meta({}: MetaArgs) {
  return [{ title: "Add Menu" }];
}

export default function AddMenuPage() {
  return <AddMenu />;
}
