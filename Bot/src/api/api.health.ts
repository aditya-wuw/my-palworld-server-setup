import type { Response } from "express";
import { Router } from "express";

export const Health = Router();

Health.get("/", (_, res: Response) => {
  res.send("bot is running ...");
});
