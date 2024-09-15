import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";
import { cookies } from "next/headers";
import { handleError } from "@/lib/errorHandler";

export async function GET() {
  try {
    const token = cookies().get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await verifyJWT(token);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
