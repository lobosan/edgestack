import { NextResponse } from "next/server";

export async function POST() {
  // For JWT-based authentication, we don't need to do anything server-side
  // The client should remove the token from local storage
  return NextResponse.json({ message: "Logged out successfully" });
}
