import { redirect } from "@remix-run/node";
import type { User } from "@prisma/client";

import { prisma } from "~/db.server";
import { authenticator } from "~/services/auth.service";
import { getSession } from "~/services/session.server";

export type { User } from "@prisma/client";

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findOrCreateUser({
  email,
  profileUrl,
}: {
  email: User["email"];
  profileUrl?: string;
}) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return await prisma.user.create({ data: { email, profileUrl } });
  }

  return user;
}

export async function getUser(request: Request) {
  const { email = "" } = (await authenticator.isAuthenticated(request)) ?? {};

  if (!email) return null;

  return prisma.user.findUnique({ where: { email } });
}
