import * as discord from "discord.js";
import { command } from "../int";
import { CreateEmbed } from "../embed";

export const userInfo: command = {
  title: "User-Information",
  description:
    "Returns the information about the author, or the one mentioned or who's id is passed",
  category: "general",
  command: function command(message: any) {
    let user: any;

    if (message.content.split(" ").length == 1) {
      user = message.author;
      message.guild.members.fetch(message.author.id).then((member: any) => {
        const embed = new discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${user.username}'s Information`)
          .setThumbnail(user.avatarURL({ dynamic: true }))
          .setFooter(`Info from ${message.guild.name}`)
          .setTimestamp()
          .setFields(
            {
              name: "User Info",
              value:
                "```Username:" +
                user.username +
                "\nDiscriminator: #" +
                user.discriminator +
                "\nTag: " +
                user.tag +
                "\nIs Bot: " +
                user.bot +
                "\nID: " +
                user.id +
                " ```",
              inline: true,
            },
            {
              name: `Member Info`,
              value:
                "```Joined Server: " +
                new Date(member.joinedTimestamp).toLocaleDateString() +
                "\nJoined Discord: " +
                new Date(user.createdTimestamp).toLocaleDateString() +
                "```",
              inline: false,
            },
            {
              name: `Roles`,
              value:
                "" +
                message.member.roles.cache.map((r: any) => r).join(" | ") +
                "",
              inline: true,
            }
          );
        message.channel.send({ embeds: [embed] });
      });
    } else if (message.mentions.users.first()) {
      user = message.mentions.users.first();
      message.guild.members.fetch(user.id).then((member: any) => {
        const embed = new discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${user.username}'s Information`)
          .setThumbnail(user.avatarURL({ dynamic: true }))
          .setFooter(`Info from ${message.guild.name}`)
          .setTimestamp()
          .setFields(
            {
              name: "User Info",
              value:
                "```Username:" +
                user.username +
                "\nDiscriminator: #" +
                user.discriminator +
                "\nTag: " +
                user.tag +
                "\nServer Nickname: " +
                member.displayName +
                "\nIs Bot: " +
                user.bot +
                "\nID: " +
                user.id +
                " ```",
              inline: true,
            },
            {
              name: `Member Info`,
              value:
                "```Joined Server: " +
                new Date(member.joinedTimestamp).toLocaleDateString() +
                "\nJoined Discord: " +
                new Date(user.createdTimestamp).toLocaleDateString() +
                "```",
              inline: false,
            },
            {
              name: `Roles`,
              value:
                "" +
                message.member.roles.cache.map((r: any) => r).join(" | ") +
                "",
              inline: true,
            }
          );
        message.channel.send({ embeds: [embed] });
      });
    } else if (message.content.split(" ").length == 2) {
      message.guild.members
        .fetch(message.content.split(" ")[1])
        .then(function (member: any) {
          user = member.user;

          const embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${member.user.username}'s Information`)
            .setThumbnail(user.avatarURL({ dynamic: true }))
            .setFooter(`Info from ${message.guild.name}`)
            .setTimestamp()
            .setFields(
              {
                name: "User Info",
                value:
                  "```Username:" +
                  user.username +
                  "\nDiscriminator: #" +
                  user.discriminator +
                  "\nTag: " +
                  user.tag +
                  "\nIs Bot: " +
                  user.bot +
                  "\nID: " +
                  user.id +
                  " ```",
                inline: true,
              },
              {
                name: `Member Info`,
                value:
                  "```Joined Server: " +
                  new Date(member.joinedTimestamp).toLocaleDateString() +
                  "\nJoined Discord: " +
                  new Date(user.createdTimestamp).toLocaleDateString() +
                  "```",
                inline: false,
              },
              {
                name: `Roles`,
                value:
                  "" +
                  message.member.roles.cache.map((r: any) => r).join(" | ") +
                  "",
                inline: true,
              }
            );
          message.channel.send({ embeds: [embed] });
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
    }
  },
};
