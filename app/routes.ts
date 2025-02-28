import {
  type RouteConfig,
  layout,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  layout("components/root-layout.tsx", [
    layout("context/no-auth.tsx", [
      index("routes/login.tsx"),
      route("/signup", "routes/signup.tsx"),
    ]),

    layout("context/auth.tsx", [
      route("/app/dashboard", "routes/dashboard.tsx"),
      route("/app/resume/add", "routes/resume-add.tsx"),
      route("/app/resume/details/:id", "routes/resume-details.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
