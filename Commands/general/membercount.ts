import * as discord from "discord.js";
import { command } from "../int";
import { CreateEmbed } from "../embed";
import { Message, Interaction, Client } from "discord.js";

export const membercount: command = {
  title: "Membercount",
  description: "Gives the number of users",
  category: "general",
  command: function command(message?: Message, interaction?: Interaction, client?: Client) {
    if (message != undefined) {
      message.channel.send({
        embeds: [CreateEmbed(
          "others",
          "Members",
          "",
          String(message?.guild?.memberCount),
          [],
          "",
          ""
        )]
      });
    }
  },
};
