import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST() {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const newAccessToken = await refreshAccessToken(refreshToken);

  if (!newAccessToken) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60, // 15 minutes
  });

  return response;
}
