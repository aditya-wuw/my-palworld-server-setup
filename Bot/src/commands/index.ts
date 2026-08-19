import { EmbedBuilder, type Client } from "discord.js";
import { CommandsRegistry } from "./Config.ts";

type CommandType = keyof typeof CommandsRegistry;

export const Commands = (client: Client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    try {
      const CommandKey = Object.keys(CommandsRegistry).find(
        (key) =>
          CommandsRegistry[key as CommandType].CMD === interaction.commandName,
      ) as CommandType;

      if (!CommandKey) throw new Error("Command not found");

      await CommandsRegistry[CommandKey].Exec(interaction);
    } catch (e) {
      console.error(`Something went wrong, Error:${e}`);
      try {
        const embed = new EmbedBuilder()
          .setColor(0xff0000)
          .setTitle("🖥 Server status")
          .setDescription(`❌ Server Offline try again later`);

        if (interaction.deferred || interaction.replied) {
          await interaction.followUp({ embeds: [embed] });
        } else {
          await interaction.reply({ embeds: [embed] });
        }
      } catch (replyError) {
        console.error(
          "Could not send failure response to interaction:",
          replyError,
        );
      }
    }
  });
};
