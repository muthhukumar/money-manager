// app/routes/auth/github/callback.tsx
import type { LoaderFunction } from "@remix-run/server-runtime";

import { authenticator } from "~/services/auth.service";

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
