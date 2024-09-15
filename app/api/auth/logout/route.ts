import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the cookies
  cookies().delete("accessToken");
  cookies().delete("refreshToken");

  return response;
}
