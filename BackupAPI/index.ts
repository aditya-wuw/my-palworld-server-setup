import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { Routes } from "./src/Routes/Routes.ts";

import fs from "fs/promises";
import { FolderWatcher } from "./src/Watcher.ts";
export const file = fs;

const app: Express = express();
const PORT: number = 3000;

console.log(`Bot Backup Endpoint set to:${process.env.UPLOAD_PATH}/api/backup`);
FolderWatcher();
app.use("/v1", Routes);
app.listen(PORT, () => {
  console.log(`listenting to ${PORT}`);
});
