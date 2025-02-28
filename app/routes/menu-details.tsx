import type { MetaArgs } from "react-router";
import MenuDetails from "~/components/menu-details";

export function meta({}: MetaArgs) {
  return [{ title: "Menu Details" }];
}

export default function MenuDetailsPage() {
  return <MenuDetails />;
}
