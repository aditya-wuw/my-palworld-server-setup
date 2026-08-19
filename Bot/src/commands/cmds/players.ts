import {
  EmbedBuilder,
  type CacheType,
  type ChatInputCommandInteraction,
} from "discord.js";
import { SERVER_API } from "../../../Bot.ts";
import getHeaders from "../../Headers.ts";

interface FilteredPlayersType {
  name: string;
  ping: number;
  level: number;
}

const players = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const response = await fetch(`${SERVER_API}/getplayers`, {
    headers: getHeaders("GET", "v1/getstatus"),
  });
  if (!response.ok)
    return await interaction.reply(
      `❌ Failed to get any player data [${response.status}]`,
    );
  const data = await response.json();
  const Playerdata = data.message as FilteredPlayersType[];
  if (Playerdata.length === 0) return interaction.reply("No player online");

  const embed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle(`🐱 Players Online (${Playerdata.length})`);

  Playerdata.forEach((player) => {
    embed.addFields({
      name: `👤 ${player.name}\n`,
      value: `🛜 • **Ping:** ${Math.round(player.ping)}ms • 🌟 **Level:** ${player.level}`,
      inline: false,
    });
  });

  await interaction.reply({ embeds: [embed] });
};
export default players;
