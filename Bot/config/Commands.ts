import {
  REST,
  Routes,
  SlashCommandBuilder,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

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

/*Register Commands*/
export const CommandsRegistry = {
  ip: { CMD: "ip", Description: "Gives you the server ip address" },
  backup: {
    CMD: "backup",
    Description: "Backs up the World file to google drive",
  },
  help: {
    CMD: "help",
    Description:
      "/ip - get server ip information\n/backup - to trigger a ondemand backup\n/help - command details",
  },
};

export const commands = [
  NewCommand(CommandsRegistry.ip.CMD, CommandsRegistry.ip.Description),
  NewCommand(CommandsRegistry.backup.CMD, CommandsRegistry.backup.Description),
  NewCommand(CommandsRegistry.help.CMD, CommandsRegistry.help.Description),
].map((command) => command);

//register commands
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
