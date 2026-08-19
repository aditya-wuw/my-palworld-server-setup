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
    return SendResponse(res, 500, false, "Shared signature wasn't configured");

  const ProvidedSignature = req.get("-x-signature");
  const Timestamp = req.get("-x-timestamp");

  if (!ProvidedSignature || !Timestamp)
    return SendResponse(res, 401, false, "Missing headers");

  if (
    ProvidedSignature.length !== 64 ||
    !/^[0-9a-fA-F]+$/.test(ProvidedSignature)
  )
    return SendResponse(res, 401, false, "Invalid Signature provided");

  const ParsedTimestamp = parseInt(Timestamp, 10);
  if (isNaN(ParsedTimestamp))
    return SendResponse(res, 401, false, "Invalid Timestamp");

  if (Math.abs(Date.now() - ParsedTimestamp) > 5 * 60 * 1000)
    return SendResponse(res, 401, false, "Request expired");

  // const requestPath = req.baseUrl ? `${req.baseUrl}${req.path}` : req.path;
  const ExpectedSignKey = `${req.method.toUpperCase()}:${req.path}:${Timestamp}`;

  const ExpectedSignature = crypto
    .createHmac("sha256", SHARED_SIGNATURE)
    .update(ExpectedSignKey)
    .digest("hex");

  const ProvidedSigBuffer = Buffer.from(ProvidedSignature, "hex");
  const ExpectedSigBuffer = Buffer.from(ExpectedSignature, "hex");

  if (
    ProvidedSigBuffer.length !== ExpectedSigBuffer.length ||
    !crypto.timingSafeEqual(ProvidedSigBuffer, ExpectedSigBuffer)
  )
    return SendResponse(res, 403, false, "Invalid signature");

  next();
};
