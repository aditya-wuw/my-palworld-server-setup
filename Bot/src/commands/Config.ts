import {
  ChatInputCommandInteraction,
  REST,
  Routes,
  SlashCommandBuilder,
  type CacheType,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";
import help from "./cmds/help.ts";
import ip from "./cmds/ip.ts";
import players from "./cmds/players.ts";
import status from "./cmds/status.ts";
import save from "./cmds/save.ts";

/*Register Commands*/
export const CommandsRegistry = {
  ip: {
    CMD: "ip",
    Description: "Gives you the server ip address",
    Exec: async (interaction: ChatInputCommandInteraction<CacheType>) =>
      ip(interaction),
  },
  save: {
    CMD: "save",
    Description: "trigger an on demand save",
    Exec: async (interaction: ChatInputCommandInteraction<CacheType>) =>
      save(interaction),
  },
  help: {
    CMD: "help",
    Description: "Get details about the commands and how to use them",
    Exec: async (interaction: ChatInputCommandInteraction<CacheType>) =>
      help(interaction),
  },
  status: {
    CMD: "status",
    Description: "Check the server status",
    Exec: async (interaction: ChatInputCommandInteraction<CacheType>) =>
      status(interaction),
  },
  players: {
    CMD: "players",
    Description: "check the player list",
    Exec: async (interaction: ChatInputCommandInteraction<CacheType>) =>
      players(interaction),
  },
  ignore: {
    CMD: "ignore",
    Description: "Admin command to whitelist users",
    Exec: async (interaction: ChatInputCommandInteraction<CacheType>) => {
      await interaction.reply("🛑 Only Admin can use this command");
    },
  },
};

/*Command builder helper*/
const NewCommand = (
  Command: string,
  Description?: string,
): RESTPostAPIChatInputApplicationCommandsJSONBody => {
  return new SlashCommandBuilder()
    .setName(Command)
    .setDescription(Description ?? "")
    .toJSON();
};

//register commands
const commands = Object.values(CommandsRegistry).map((item) =>
  NewCommand(item.CMD, item.Description),
);

//register commands to discord
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN as string,
);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID as string),
      { body: commands },
    );
    console.log("Commands registered successfully!");
  } catch (error) {
    console.error(error);
  }
})();
