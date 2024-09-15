"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/lib/jwt";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { returnValidationErrors } from "next-safe-action";

const prisma = new PrismaClient();

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .refine(
    async ({ email }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      return !!user;
    },
    {
      message: "User not found",
      path: ["email"],
    }
  );

export const loginAction = actionClient
  .metadata({ actionName: "login" })
  .schema(schema)
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      returnValidationErrors(schema, {
        email: { _errors: ["Invalid email or password"] },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      returnValidationErrors(schema, {
        password: { _errors: ["Invalid email or password"] },
      });
    }

    const accessToken = await signJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const refreshToken = await signJWT(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      true
    );

    // Set cookies
    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
    });

    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  });
