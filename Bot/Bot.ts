import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { Routes } from "./src/api/index.ts";
import { Commands } from "./src/commands/index.ts";
import morgan from "morgan";

export const app: Express = express();

/*Discord client*/
const CHANNEL_ID = process.env.CHANNEL_ID as string;
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
Commands(client);
client.login(process.env.DISCORD_BOT_TOKEN as string);

const PORT: number = 1000;
app.use(morgan("dev"));

/*Api routes*/
app.use("/api", Routes);

/*Discord client*/
client.once("clientReady", () => {
  const Channel = client.channels.cache.get(CHANNEL_ID) as TextChannel;
  if (!Channel)
    return console.error(
      "Channel not found, please configure a correct Channel ID",
    );
  // Channel.send("Hi Test 1234 connection test!!");
  // Channel.send("🛑 Server is currently Offline");
});

/*Port assignment*/
app.listen(PORT, () => {
  console.log(`bot running on Port :${PORT}`);
});
