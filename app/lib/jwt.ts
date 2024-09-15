import { env } from "./env";
import { z } from "zod";

const JWT_SECRET = env.JWT_SECRET;

export const UserPayload = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  role: z.enum(["GUEST", "USER", "ADMINISTRATOR"]),
});

export type UserPayload = z.infer<typeof UserPayload>;

export async function signJWT(payload: UserPayload): Promise<string> {
  const encoder = new TextEncoder();
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = await crypto.subtle.sign(
    { name: "HMAC", hash: "SHA-256" },
    await crypto.subtle.importKey(
      "raw",
      encoder.encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    ),
    encoder.encode(data)
  );
  const encodedSignature = btoa(
    String.fromCharCode(...Array.from(new Uint8Array(signature)))
  );
  return `${data}.${encodedSignature}`;
}

export async function verifyJWT(token: string): Promise<UserPayload | null> {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
    const encoder = new TextEncoder();
    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = Uint8Array.from(atob(encodedSignature), (c) =>
      c.charCodeAt(0)
    );
    const isValid = await crypto.subtle.verify(
      { name: "HMAC", hash: "SHA-256" },
      await crypto.subtle.importKey(
        "raw",
        encoder.encode(JWT_SECRET),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
      ),
      signature,
      encoder.encode(data)
    );
    if (!isValid) return null;
    const payload = JSON.parse(atob(encodedPayload));
    return UserPayload.parse(payload);
  } catch (error) {
    return null;
  }
}
