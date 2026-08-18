import {
  EmbedBuilder,
  type CacheType,
  type ChatInputCommandInteraction,
} from "discord.js";

const server = {
  ip: "pal.smgcat.site:11322",
  password: "smugcat",
  version: "v1.0.3",
};

const ip = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("📟 Server Connection")
    .setDescription(
      `current server version is **${server.version}** make sure your game client is has the same version, here are the server connection information\n` +
        "### 💻 **Ip**\n" +
        `> ${server.ip}\n` +
        "### 🔑 **Password**\n" +
        `> ${server.password}\n\n`,
    );

  await interaction.reply({ embeds: [embed] });
};
export default ip;
