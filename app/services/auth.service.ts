// app/services/auth.server.ts
import type { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";

import invariant from "tiny-invariant";

import { GoogleStrategy } from "remix-auth-google";

import { findOrCreateUser } from "~/models/user.server";

// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

// const GITHUB_SECRET = process.env.GITHUB_SECRET;

// const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

// invariant(GITHUB_CLIENT_ID, "GITHUB_CLIENT_ID must be set");

// invariant(GITHUB_SECRET, "GITHUB_SECRET must be set");

// invariant(GITHUB_CALLBACK_URL, "GITHUB_CALLBACK_URL must be set");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

invariant(GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID must be set");

invariant(GOOGLE_SECRET, "GOOGLE_SECRET must be set");

invariant(GOOGLE_CALLBACK_URL, "GOOGLE_CALLBACK_URL must be set");

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  },
  async ({ profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    return findOrCreateUser(profile.emails[0].value ?? "");
  }
);

authenticator.use(googleStrategy);
