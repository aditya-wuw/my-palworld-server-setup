import type { Response } from "express";

export const SendResponse = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
) => {
  return res.status(status).json({ success: success, message: message });
};


