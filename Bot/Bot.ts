import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { Client, GatewayIntentBits, TextChannel } from "discord.js";
// import { Routes } from "./src/api/UploadBackup.ts";
import { Commands } from "./src/commands/index.ts";
import morgan from "morgan";
import { Routes } from "./src/api/api.backup.ts";

export const app: Express = express();
app.use(morgan("dev"));
export const SERVER_API =
  process.env.SERVER_BACKUP_API_ENDPOINT || "http://localhost:1000/v1";
const PORT: number = 1000;

/*Discord client*/
const CHANNEL_ID = process.env.CHANNEL_ID as string;
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
Commands(client);
client.login(process.env.DISCORD_BOT_TOKEN as string);

/*Api routes*/
app.use("/api", Routes);

/*Discord client*/
client.once("clientReady", () => {
  const Channel = client.channels.cache.get(CHANNEL_ID) as TextChannel;
  if (!Channel)
    return console.error(
      "Channel not found, Bot may not be in the Server or have a correct Channel ID",
    );
});

/*Port assignment*/
app.listen(PORT, () => {
  console.log(`bot running on Port :${PORT}`);
});
