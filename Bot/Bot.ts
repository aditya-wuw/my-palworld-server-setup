import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  TextChannel,
} from "discord.js";
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

export const SendMessage = async (msg: string, success: boolean) => {
  /*Discord client*/
  try {
    const Channel = (await client.channels.fetch(CHANNEL_ID)) as TextChannel;
    if (!Channel)
      return console.error(
        "Channel not found, Bot may not be in the Server or have a correct Channel ID",
      );
    const embed = new EmbedBuilder()
      .setColor(success ? 0x57f287 : 0xff0000)
      .setTitle("Notification")
      .setDescription(msg);
    await Channel.send({ embeds: [embed] });
  } catch (e) {
    console.error(`Failed to send message, Error: ${e}`);
  }
};

app.listen(PORT, () => {
  console.log(`Bot running on Port :${PORT}`);
});
