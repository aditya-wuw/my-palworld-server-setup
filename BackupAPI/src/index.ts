import express, { type Express, type Request, type Response } from "express";
import fs from "fs/promises";
const app: Express = express();
const PORT: number = 3000;

/*
  Enviornment variables
*/
const DRIVE_API_KEY = process.env.DRIVE_API;
const DRIVE_FOLDER: string =
  "https://drive.google.com/drive/u/1/folders/1ZYNLAZ9q8Zv2-le6VKsAA-RIkPOIUTzE";
/*
  Routes
*/
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
  console.log("server is running");
});

app.listen(PORT, () => {
  console.log(`listenting to ${PORT}`);
});
