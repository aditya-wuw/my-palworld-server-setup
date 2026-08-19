import crypto from "crypto";
import { SHARED_SIGNATURE } from "../index.ts";
type MethodType = "POST" | "GET";

export default function getHeaders(Method: MethodType, Path: string) {
  if (!SHARED_SIGNATURE) throw new Error("Shared Signature wasn't configured");

  const Timestamp = Date.now().toString();
  const SignKey = `${Method}:${Path}:${Timestamp}`;
  console.log("constructed Signkey: ", SignKey); //debug
  const Signature = crypto
    .createHmac("sha256", SHARED_SIGNATURE)
    .update(SignKey)
    .digest("hex");

  const headers = {
    "-x-timestamp": Timestamp,
    "-x-signature": Signature,
  };

  return headers;
}
