import { Router } from "express";
import { type Request, type Response } from "express";

export const Routes = Router();

Routes.get("/backup", (req: Request, res: Response) => {
  res.send("Hello World!");
});
