import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import {
  Client,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
  TextChannel,
} from "discord.js";
// import { Routes } from "./src/api/UploadBackup.ts";
import { Commands } from "./src/commands/index.ts";
import morgan from "morgan";
import { Routes } from "./src/api/api.backup.ts";
import { CheckSignature } from "./src/middleware.ts";
import { rateLimit } from "express-rate-limit";
import { Health } from "./src/api/api.health.ts";

export const app: Express = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 10 minutes
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});
app.use(morgan("dev"));
app.use(limiter);
const PORT: number = Number(process.env.PORT);
export const SERVER_API =
  process.env.SERVER_BACKUP_API_ENDPOINT || "http://localhost:1000/v1";
export const SHARED_SIGNATURE = process.env.SHARED_CLIENT_SIGNATURE;

/*Discord client*/
const CHANNEL_ID = process.env.CHANNEL_ID as string;
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
client
  .login(process.env.DISCORD_BOT_TOKEN as string)
  .then(() => console.log("Gateway login call initiated."))
  .catch((err) => console.error("Failed to login to Discord ->", err));
Commands(client);

/*routes*/
app.use(Health);
app.use("/api", CheckSignature, Routes);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}! Bot is now active.`);
});

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
