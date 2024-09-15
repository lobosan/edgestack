import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const user = await verifyJWT(token);

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
