import {
  type RouteConfig,
  layout,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  layout("components/wrapper.tsx", [
    layout("context/auth.tsx", [
      index("routes/dashboard.tsx"),
      route("/menu/add", "routes/menu-add.tsx"),
      route("/menu/details/:id", "routes/menu-details.tsx"),
    ]),

    layout("context/no-auth.tsx", [
      route("/login", "routes/login.tsx"),
      route("/signup", "routes/signup.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
