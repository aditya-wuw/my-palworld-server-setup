import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { SHARED_SIGNATURE } from "../index.ts";

export const CheckSignature = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!SHARED_SIGNATURE)
    return res
      .status(500)
      .json({ message: "Shared signature wasn't configured" });

  const ProvidedSignature = req.get("-x-signature");
  const Timestamp = req.get("-x-timestamp");

  if (!ProvidedSignature || !Timestamp)
    return res.status(401).json({ message: "Missing headers" });

  if (
    ProvidedSignature.length !== 64 ||
    !/^[0-9a-fA-F]+$/.test(ProvidedSignature)
  )
    return res.status(401).json({ message: "Invalid Signature provided" });

  const ParsedTimestamp = parseInt(Timestamp, 10);
  if (isNaN(ParsedTimestamp))
    return res.status(401).json({ message: "Invalid Timestamp" });

  if (Math.abs(Date.now() - ParsedTimestamp) > 5 * 60 * 1000)
    return res.status(401).json({ message: "Request expired" });

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
    return res.status(403).json({ message: "Invalid signature" });

  next();
};
