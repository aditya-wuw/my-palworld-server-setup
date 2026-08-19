import type { Request, Response, NextFunction } from "express";
import { SendResponse } from "./utils/Utils.ts";
import { SHARED_SIGNATURE } from "../Bot.ts";
import crypto from "crypto";

export const CheckSignature = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!SHARED_SIGNATURE)
    return SendResponse(res, 401, false, "Shared signature wasn't configured");

  const ProvidedSignature = req.get("-x-signature");
  const Timestamp = req.get("-x-timestamp");

  if (!ProvidedSignature || !Timestamp)
    return SendResponse(res, 401, false, "Missing headers");

  if (Math.abs(Date.now() - parseInt(Timestamp, 10)) > 5 * 60 * 100)
    return SendResponse(res, 401, false, "Request expired");

  const ExpectedkKey = `${req.method}:${req.path}:${Timestamp}`;
  const ExpectedSignature = crypto
    .createHmac("sha256", ProvidedSignature)
    .update(ExpectedkKey)
    .digest("hex");

  const ProvidedSigBuffer = Buffer.from(ProvidedSignature, "hex");
  const ExpectedSigBuffer = Buffer.from(ExpectedSignature, "hex");

  if (
    ProvidedSigBuffer.length !== ExpectedSigBuffer.length ||
    crypto.timingSafeEqual(ProvidedSigBuffer, ExpectedSigBuffer)
  )
    return SendResponse(res, 403, false, "Invalid signature");

  next();
};
