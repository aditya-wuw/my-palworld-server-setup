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
      .status(401)
      .json({ message: "Shared signature wasn't configured" });

  const ProvidedSignature = req.get("-x-signature");
  const Timestamp = req.get("-x-timestamp");

  if (!ProvidedSignature || !Timestamp)
    return res.status(401).json({ message: "Missing headers" });

  if (Math.abs(Date.now() - parseInt(Timestamp, 10)) > 5 * 60 * 100)
    return res.status(401).json({ message: "Request expired" });

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
    return res.status(403).json({ message: "Invalid signature" });

  next();
};
