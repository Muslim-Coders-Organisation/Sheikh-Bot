import * as discord from "discord.js";
import { command } from "../int";
import { CreateEmbed } from "../embed";

export const memberCount: command = {
  title: "Membercount",
  description: "Gives the number of users",
  category: "general",
  command: function command(message: any) {
    message.channel.send({
      embeds: CreateEmbed(
        "others",
        "Members",
        "",
        String(message?.guild?.memberCount),
        [],
        "",
        ""
      ),
    });
  },
};
