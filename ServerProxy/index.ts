import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { Routes } from "./src/Routes.ts";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";

import fs from "fs/promises";
import { FolderWatcher } from "./src/Watcher.ts";
import { CheckSignature } from "./src/middleware.ts";
export const file = fs;
const app: Express = express();
const PORT: number = 3000;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

app.use(limiter);
app.use(morgan("dev"));
app.set("trust proxy", 1);

export const SHARED_SIGNATURE = process.env.SHARED_SIGNATURE;
/**
 * Port configuration
 */
const PalworldServerPort = process.env.API_PORT || "8212";
export const ServerEndPoint = `http://palworld-server:${PalworldServerPort}`;

export const Auth = `Basic ${Buffer.from(`admin:${process.env.PASSWORD}`).toString("base64")}`;

if (!process.env.UPLOAD_PATH) {
  console.log(
    `Upload endpoint was not setup, UPLOAD_PATH:${process.env.UPLOAD_PATH}`,
  );
} else {
  console.log(`Upload endpoint set to :${process.env.UPLOAD_PATH}`);
  FolderWatcher();
}

app.get("/", async (_, res: Response) => {
  return res.send("Palworld proxy server running ...");
});

app.use("/v1", CheckSignature, Routes);
app.listen(PORT, () => {
  console.log(`listenting to ${PORT}`);
});
