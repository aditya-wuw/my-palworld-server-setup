import {
  EmbedBuilder,
  type CacheType,
  type ChatInputCommandInteraction,
} from "discord.js";

const help = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("🐸 Server query Commands")
    .setDescription(
      "### 💻 /ip\n" +
        "> Get server IP address and password\n" +
        "### 💾 /backup\n" +
        "> Trigger an on-demand world backup\n" +
        "### 🟢 /status\n" +
        "> Check if the game server is online\n" +
        "### 👥 /players\n" +
        "> Get the list of currently active players",
    );

  await interaction.reply({ embeds: [embed] });
};
export default help;
