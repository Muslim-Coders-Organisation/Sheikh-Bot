import * as discord from "discord.js";
import { command } from "../int";
import { CreateEmbed } from "../embed";

export const Avatar: command = {
  title: "Avatar",
  description:
    "Returns the avatar of the author, or the one mentioned or who's id is passed",
  category: "general",
  command: function command(message: any, client: any) {
    let user = message.author;
    if (message.content.split(" ").length == 1) {
      const embed = new discord.MessageEmbed()
        .setAuthor("Your Avatar")
        .setImage(
          `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
        )
        .setColor("RANDOM");
      message.reply({ embeds: [embed] });
    } else if (message.mentions.users.first()) {
      user = message.mentions.users.first();
      const embed = new discord.MessageEmbed()
        .setAuthor("Your Avatar")
        .setImage(
          `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
        )
        .setColor("RANDOM");
      message.reply({ embeds: [embed] });
    } else if (message.content.split(" ").length == 2) {
      if (Number(message.content.split(" ")[1])) {
        client.users
          .fetch(message.content.split(" ")[1])
          .then(function (user: any) {
            const embed = new discord.MessageEmbed()
              .setAuthor("Your Avatar")
              .setImage(
                `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
              )
              .setColor("RANDOM");
            message.reply({ embeds: [embed] });
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
        const errorEmbed = new discord.MessageEmbed()
          .setColor("#ff0000")
          .setTitle("Failed")
          .setFields({
            name: "ID not found",
            value: `Seems like the user id you provided wasn't right, please try again witht he correct id`,
          })
          .setFooter("Try again");
        message.channel.send({ embeds: [errorEmbed] });
      }
    }
  },
};
