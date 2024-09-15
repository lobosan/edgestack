import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return "An unexpected error occurred";
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(async ({ next }) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    throw new ActionError("Unauthorized");
  }

  try {
    const payload = await verifyJWT(token);
    if (!payload) {
      throw new ActionError("Invalid token");
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
      throw new ActionError("User not found");
    }

    // Add redirection logic here
    if (user.role === "ADMINISTRATOR") {
      return next({ ctx: { user, redirect: "/dashboard" } });
    } else {
      return next({ ctx: { user, redirect: "/" } });
    }
  } catch (error) {
    throw new ActionError("Unauthorized");
  }
});

// You can create additional clients with more specific middleware if needed
export const adminActionClient = actionClient.use(async ({ next, ctx }) => {
  if (ctx.user.role !== "ADMINISTRATOR") {
    throw new ActionError("Admin access required");
  }
  return next();
});
