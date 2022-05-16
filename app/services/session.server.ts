import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

const SESSION_SECRET = process.env.SESSION_SECRET;

invariant(SESSION_SECRET, "SESSION_SECRET must be set");

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [SESSION_SECRET], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;

export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
