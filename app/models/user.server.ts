import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findOrCreateUser(email: User["email"]) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return await prisma.user.create({ data: { email } });
  }

  return user;
}
