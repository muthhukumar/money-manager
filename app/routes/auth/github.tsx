// app/routes/auth/github.tsx
import type { LoaderFunction, ActionFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";

import { authenticator } from "~/services/auth.service";

export let loader: LoaderFunction = () => redirect("/login");

export let action: ActionFunction = ({ request }) => {
  return authenticator.authenticate("github", request);
};
