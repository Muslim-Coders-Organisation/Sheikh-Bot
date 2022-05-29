import * as discord from "discord.js";
import { isMemberName } from "typescript";
import log, { errorLog } from "../../General/logger";
import { command } from "../int";

export const VerifyCreate: command = {
  title: "Verification System - 1",
  description: "Only for the bot",
  category: "moderation-general",
  command: async function command(member: any) {

    let exists: boolean = false,
      id: number = 0,
      parent: any;
    member.guild.channels.cache.forEach((channel: any) => {
      if (channel.type == "GUILD_CATEGORY") {
        if (channel.name == "Verification-tickets") {

          exists = true;
          parent = channel.id;
        }
      }
    });
    if (exists) {
      member.guild.channels.create(`Verification-${member.user.username}`, {
        type: 'GUILD_TEXT',
        // under the parent category
        parent: parent,
        permissionOverwrites: [
          {
            id: member.user.id,
            allow: [
              "SEND_MESSAGES",
              "VIEW_CHANNEL",
            ],
          },
          {
            id: '929311330387787838',
            deny: ['VIEW_CHANNEL']
          },
          {
            id: '841728006224347167',
            deny: ['VIEW_CHANNEL']
          }
        ]
      }).then((c: any) => {

        const embed = new discord.MessageEmbed()
          .setTitle(
            "Assalamualaikum and Welcome to Muslim Coders, glad to have you here with us."
          )
          .setColor("#df2055")
          .setDescription(
            "To get access to the whole server please answer the questions below! :D \n 1. Who invited you? or Where did you find this server? (Be clear) \n 2. Whats your religion? (does not affect anything) \n 3. Why did you join this server? \n 4. Do you agree with #📜➣rules \n"
          )
          .setFooter(
            "The moderation team will verify you as soon as possibe :)"
          )
          .setTimestamp();
        c.send({ embeds: [embed] });
        c.send(`<@${member.id}> Please answer the Questions above`);

      })
        .catch((err: Error) => {
          log("error", "Discord", "Error while creating channel: " + err.name);
          errorLog(err);
        });


    }
    if (!exists) {
      parent = await member.guild.channels.create("Verification-tickets", {
        type: "GUILD_CATEGORY",
        permissionOverwrites: [
          {
            id: '929311330387787838',
            deny: ['VIEW_CHANNEL']
          },
          {
            id: '841728006224347167',
            deny: ['VIEW_CHANNEL']
          }
        ]
      }).then((parent: any) => {
        member.guild.channels.create(`Verification - ${member.user.username}`, {
          type: 'GUILD_TEXT',
          // under the parent category
          parent, // shorthand for parent: parent
          permissionOverwrites: [
            {
              id: member.user.id,
              allow: [
                "SEND_MESSAGES",
                "VIEW_CHANNEL",
              ],
            },
            {
              id: '929311330387787838',
              deny: ['VIEW_CHANNEL']
            },
            {
              id: '841728006224347167',
              deny: ['VIEW_CHANNEL']
            }
          ]
        }).then((c: any) => {

          const embed = new discord.MessageEmbed()
            .setTitle(
              "Assalamualaikum and Welcome to Muslim Coders, glad to have you here with us."
            )
            .setColor("#df2055")
            .setDescription(
              "To get access to the whole server please answer the questions below! :D \n 1. Who invited you? or Where did you find this server? (Be clear) \n 2. Whats your religion? (does not affect anything) \n 3. Why did you join this server? \n 4. Do you agree with #📜➣rules \n"
            )
            .setFooter(
              "The moderation team will verify you as soon as possibe :)"
            )
            .setTimestamp();
          c.send({ embeds: [embed] });
          c.send(`<@${member.id}> Please answer the Questions above`);

        })
          .catch((err: Error) => {
            log("error", "Discord", "Error while creating channel: " + err.name);
            errorLog(err);
          });
      })

    }
  },
};
