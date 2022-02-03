import * as discord from "discord.js";
import { isMemberName } from "typescript";
import log, { errorLog } from "../General/logger";
import { command } from "./int";

export const VerifyCreate: command = {
  title: "Verification System - 1",
  description: "Only for the bot",
  category: "moderation-general",
  command: async function command(member: any) {
    let exists: boolean = false,
      id: number = 0,
      parent: any;
    member.guild.channels.cache.forEach((channel: any) => {
      if (channel.type == "category") {
        if (channel.name == "BVerification") {
          exists = true;
          parent = channel.id;
        }
      }
    });

    if (!exists) {
      parent = await member.guild.channels.create("BVerification", {
        type: "category",
        permissionOverwrites: [
          {
            id: "841728006224347167",
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: "842083990420193361",
            allow: [
              "SEND_MESSAGES",
              "VIEW_CHANNEL",
              "ADD_REACTIONS",
              "EMBED_LINKS",
              "ATTACH_FILES",
              "READ_MESSAGE_HISTORY",
              "USE_EXTERNAL_EMOJIS",
            ],
          },
          {
            id: "842083989577400411",
            allow: [
              "SEND_MESSAGES",
              "VIEW_CHANNEL",
              "ADD_REACTIONS",
              "EMBED_LINKS",
              "ATTACH_FILES",
              "READ_MESSAGE_HISTORY",
              "USE_EXTERNAL_EMOJIS",
            ],
          },
        ],
      });
    }
    let ch = await member.guild.channels
      .create(`ticket-${member.tag}`, {
        type: "text",
        parent: parent,
        permissionOverwrites: [
          {
            id: "841728006224347167",
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: member.id,
            allow: [
              "SEND_MESSAGES",
              "VIEW_CHANNEL",
              "ADD_REACTIONS",
              "EMBED_LINKS",
              "ATTACH_FILES",
              "READ_MESSAGE_HISTORY",
              "USE_EXTERNAL_EMOJIS",
            ],
          },

          {
            id: "842083990420193361",
            allow: [
              "SEND_MESSAGES",
              "VIEW_CHANNEL",
              "ADD_REACTIONS",
              "EMBED_LINKS",
              "ATTACH_FILES",
              "READ_MESSAGE_HISTORY",
              "USE_EXTERNAL_EMOJIS",
            ],
          },
          {
            id: "842083989577400411",
            allow: [
              "SEND_MESSAGES",
              "VIEW_CHANNEL",
              "ADD_REACTIONS",
              "EMBED_LINKS",
              "ATTACH_FILES",
              "READ_MESSAGE_HISTORY",
              "USE_EXTERNAL_EMOJIS",
            ],
          },
        ],
      })
      .then((c: any) => {
        c.send(`<@${member.id}> Please answer the Questions below`);
        const embed = new discord.MessageEmbed()
          .setTitle(
            "Salam and Welcome to Muslim Coders, glad to have you here with us."
          )
          .setAuthor("Sheikh Chilli")
          .setColor("#df2055")
          .setDescription(
            "To get access to the whole server please answer the questions below! :D \n 1. Who invited you? (Be clear) \n 2. Whats your religion? (doesent affect anything) \n 3. Why did you join this server? \n 4. Do you agree with #📜➣rules \n"
          )
          .setFooter(
            "The moderation team will verify you as soon as possibe :)"
          )
          .setTimestamp();
        c.send({ embed });
      })
      .catch((err: Error) => {
        log("error", "Discord", "Error while creating channel: " + err.name);
        errorLog(err);
      });
  },
};
