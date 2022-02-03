import * as discord from "discord.js";
import { CreateEmbed } from "../embed";
import { command } from "../int";

export const Unban: command = {
  title: "Unban",
  description: "Unbans the user mentioned by their id",
  category: "moderation-admin",
  command: function command(message: any) {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.channel.send(
        "You aren't based enough to use this command [Reality "
      );
    } else {
      if (
        message.content.length >= 2 &&
        message.content.split(" ")[1].length == 18 &&
        Number(message.content.split(" ")[1])
      ) {
        message.guild.members
          .unban(message.content.split(" ")[1])
          .then((user: any) => {
            message.channel.send(`Unbanned ${user.id}`);
          })
          .catch((error: any) =>
            message.channel.send({
              embed: CreateEmbed(
                "fail",
                "Error",
                "",
                "Please use proper id for unbanning the user",
                [],
                "",
                ""
              ),
            })
          );
      } else {
        message.channel.send({
          embed: CreateEmbed(
            "fail",
            "Couldn't Unban",
            "",
            "Please provide the id as the first argument followed by the reason [Note the reason is optional]",
            [],
            "",
            ""
          ),
        });
      }
    }
  },
};
