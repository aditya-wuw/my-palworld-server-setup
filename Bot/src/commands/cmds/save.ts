import {
  MessageFlags,
  type CacheType,
  type ChatInputCommandInteraction,
} from "discord.js";
import { SERVER_API } from "../../../Bot.ts";
import getHeaders from "../../Headers.ts";

const save = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  await interaction.deferReply();
  const response = await fetch(`${SERVER_API}/v1/save`, {
    headers: getHeaders("GET", "/v1/save"),
  });
  if (!response.ok)
    return await interaction.editReply(
      `❌ Failed to trigger save [${response.status}]`,
    );
  const data = await response.json();
  await interaction.editReply(`✅ ${data.message}`);
};
export default save;
