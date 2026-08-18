import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { Routes } from "./src/Routes.ts";
import { rateLimit } from "express-rate-limit";

import fs from "fs/promises";
import { FolderWatcher } from "./src/Watcher.ts";
export const file = fs;
const app: Express = express();
const PORT: number = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});
app.use(limiter);

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

app.use("/v1", Routes);
app.listen(PORT, () => {
  console.log(`listenting to ${PORT}`);
});
