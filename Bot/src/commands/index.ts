import type { Client } from "discord.js";
import { CommandsRegistry } from "../../config/CmdConfig.ts";

export const Commands = (client: Client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    // /ip command
    if (interaction.commandName === CommandsRegistry.ip.CMD) {
      await interaction.reply(
        "💻 **Ip:** pal.smgcat.site:11322, **Password:** smugcat",
      );
    }
    // /help command
    if (interaction.commandName === CommandsRegistry.help.CMD) {
      await interaction.reply(CommandsRegistry.help.Description);
    }
    // /ping command
    if (interaction.commandName === CommandsRegistry.ping.CMD) {
      await interaction.reply("✅ Ok 200");
    }

    /*Admin commands*/
    // /backup command
    if (interaction.commandName === CommandsRegistry.backup.CMD) {
      await interaction.reply("🛑 Backup apis are under development");
    }
    // /restart command
    if (interaction.commandName === CommandsRegistry.restart.CMD) {
      await interaction.reply("setup required");
    }
    // /ignore command
    if (interaction.commandName === CommandsRegistry.ignore.CMD) {
      await interaction.reply("setup required");
    }
  });
};
