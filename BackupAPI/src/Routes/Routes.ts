import type { Response } from "express";
import type { Request } from "express";
import { Router } from "express";

export const Routes = Router();

Routes.get("/getbackup", (req: Request, res: Response) => {
  res.status(200).json({ message: "recived" });
});
