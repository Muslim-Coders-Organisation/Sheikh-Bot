import { command } from "./int";
import * as discord from "discord.js";
import { CreateEmbed } from "./embed";

export const warnUser: command = {
  title: "Warn User",
  description: "Warns the user mentioned.",
  category: "moderation-general",
  command: function command(client: any, message: any) {
    if (
      message.content.split(" ")[0] == ";warn" &&
      message.content.split(" ").length > 1 &&
      message.mentions.users.first()
    ) {
      if (
        message.member.permissions.has(discord.Permissions.FLAGS.KICK_MEMBERS)
      ) {
        const mod = message.author.tag;
        const cmdArguments = message.content.split(" ");
        let reason = [];

        for (let i = 0; i < cmdArguments.length; i++) {
          if (i != 0 && i != 1) {
            reason.push(cmdArguments[i]);
          }
        }
        if (reason.length == 0) {
          reason.push("No reason specified");
        }
        const user = message.mentions.users.first();

        if (message.author.id != user.id) {
          const warnEmbed = new discord.MessageEmbed()
            .setColor("#FFA500")
            .setTitle("You have been warned")
            .setFields(
              {
                name: "Event:",
                value: `${mod} has issued a warning to you.`,
              },
              {
                name: "Reason:",
                value: reason.join(" "),
              }
            )
            .setFooter("Read the rules and behave nicely :)");
          message.channel.send("Successfully warned");
          user
            .send({ embeds: [warnEmbed] })
            .catch((err: any) => console.log(err));
        } else {
          message.channel.send(
            "Dude you can't warn yourself stop wasting my time"
          );
        }
      } else {
        let mod = message.author.tag;
        message.channel.send("@" + mod + " you can't warn lol");
      }
    } else if (
      message.content.split(" ")[0] == ";warn" &&
      message.content.split(" ").length > 1
    ) {
      let author_id = message.author.id;
      const cmdArguments = message.content.split(" ");
      let reason = [];
      for (let i = 0; i < cmdArguments.length; i++) {
        if (i != 0 && i != 1) {
          reason.push(cmdArguments[i]);
        }
      }
      if (reason.length == 0) {
        reason.push("No reason specified");
      }
      let mod = message.author.tag;
      if (author_id != message.content.split(" ")[1]) {
        const warnEmbed = new discord.MessageEmbed()
          .setColor("#FFA500")
          .setTitle("You have been warned")
          .setFields(
            {
              name: "Event:",
              value: `${mod} has issued a warning to you.`,
            },
            {
              name: "Reason:",
              value: reason.join(" "),
            }
          )
          .setFooter("Read the rules and behave nicely :)");

        client.users
          .fetch(message.content.split(" ")[1])
          .then((user: any) => {
            console.log(user);
            user?.send({ embeds: [warnEmbed] });
            message.channel.send("Successfully warned");
          })
          .catch((x: any) => {
            const errorEmbed = new discord.MessageEmbed()
              .setColor("#ff0000")
              .setTitle("Failed")
              .setFields({
                name: "ID not found",
                value: `Seems like the user id you provided wasn't right, please try again witht he correct id`,
              })
              .setFooter("Try again");
            message.channel.send({ embeds: [errorEmbed] });
          });
      } else {
        message.channel.send(
          "Dude you can't warn yourself stop wasting my time"
        );
      }
    } else {
      const errorEmbed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Failed")
        .setFields({
          name: "Improper use of the warn command",
          value: `Message starts with ;warn followed by the user then the reason [Note reason is optional ]`,
        })
        .setFooter("Try again");
      message.channel.send({ embeds: [errorEmbed] });
    }
  },
};
