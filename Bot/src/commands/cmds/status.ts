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
  building_count: number;
}

const status = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const response = await fetch(`${SERVER_API}/getstatus`, {
    headers: getHeaders("GET", "/getstatus"),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("🖥 Server status")
      .setDescription(errorData.message);

    return await interaction.reply({ embeds: [embed] });
  }

  const data = await response.json();

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("🖥 Server status")
    .setDescription(data.message);

  await interaction.reply({ embeds: [embed] });
};
export default status;
