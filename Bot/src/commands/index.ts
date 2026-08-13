import type { Client } from "discord.js";
import { CommandsRegistry } from "../../config/Commands.ts";

export const Commands = (client: Client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // /ip command
    if (
      interaction.commandName.trim().toLocaleLowerCase() ===
      CommandsRegistry.ip.CMD.trim().toLocaleLowerCase()
    ) {
      await interaction.reply(
        "💻**Ip:** pal.smgcat.site:11322, **Password:**smugcat",
      );
    }

    // /backup command
    if (
      interaction.commandName.trim().toLocaleLowerCase() ===
      CommandsRegistry.backup.CMD.trim().toLocaleLowerCase()
    ) {
      await interaction.reply("🛑 Backup apis are under development");
    }
    // /help command
    if (
      interaction.commandName.trim().toLocaleLowerCase() ===
      CommandsRegistry.help.CMD.trim().toLocaleLowerCase()
    ) {
      await interaction.reply(CommandsRegistry.help.Description);
    }
  });
};
