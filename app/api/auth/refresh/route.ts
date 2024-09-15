import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { handleError } from "@/lib/errorHandler";

export async function POST() {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const newAccessToken = await refreshAccessToken(refreshToken);

    if (!newAccessToken) {
      throw new Error("Invalid refresh token");
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
    });

    return response;
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
