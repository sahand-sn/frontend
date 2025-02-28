import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";
import type { LinkProps } from "@mui/material/Link";
import { forwardRef } from "react";
import { createTheme } from "@mui/material";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const theme = createTheme({
  palette: {
    primary: { main: "#2d5f7d" },
    secondary: { main: "#5f2d7d" },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
