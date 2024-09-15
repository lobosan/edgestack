import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import { signJWT } from "@/lib/jwt";
import { z } from "zod";
import { handleError } from "@/lib/errorHandler";

const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const GoogleAuthSchema = z.object({
  token: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = GoogleAuthSchema.parse(body);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error("Invalid token");
    }

    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payload.email,
          name: payload.name,
          role: "USER",
        },
      });
    }

    const accessToken = await signJWT({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await signJWT(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      true
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    return response;
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
