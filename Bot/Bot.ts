import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { Client, GatewayIntentBits, TextChannel } from "discord.js";
// import { Routes } from "./src/api/UploadBackup.ts";
import { Commands } from "./src/commands/index.ts";
import morgan from "morgan";
import { Routes } from "./src/api/api.backup.ts";
import { CheckSignature } from "./src/middleware.ts";

export const app: Express = express();
app.use(morgan("dev"));
const PORT: number = 1000;
export const SERVER_API =
  process.env.SERVER_BACKUP_API_ENDPOINT || "http://localhost:1000/v1";
export const SHARED_SIGNATURE = process.env.SHARED_CLIENT_SIGNATURE;

/*Discord client*/
const CHANNEL_ID = process.env.CHANNEL_ID as string;
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
Commands(client);
client.login(process.env.DISCORD_BOT_TOKEN as string);

/*routes*/
app.use("/api", CheckSignature, Routes);

/*Discord client*/
client.once("clientReady", () => {
  const Channel = client.channels.cache.get(CHANNEL_ID) as TextChannel;
  if (!Channel)
    return console.error(
      "Channel not found, Bot may not be in the Server or have a correct Channel ID",
    );
});

app.listen(PORT, () => {
  console.log(`Bot running on Port :${PORT}`);
});
