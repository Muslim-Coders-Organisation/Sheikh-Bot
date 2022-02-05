import * as discord from "discord.js";
import log, { errorLog } from "../../General/logger";
import { command } from "../int";
import { Message, Interaction, Client } from "discord.js";

export const serverinfo: command = {
  title: "Server-Info",
  description: "Returns Information about the server",
  category: "general",
  command: function command(message?: Message, interaction?: Interaction, client?: Client) {
    if (message != undefined && client != undefined && message.guild) {
      let name = "";
      client.users
        .fetch(message?.guild?.ownerId)
        .then((user: any) => {
          name = user.username + "#" + user.discriminator;
          const ServerLogo: string | undefined | null = message.guild?.iconURL();
          const ServerInfoEmbed = new discord.MessageEmbed()
            .setColor("#b700ff")
            .setTitle("Server Info")
            .setImage(ServerLogo == undefined ? '' : ServerLogo)
            .setDescription(`About **${message.guild?.name}**`)
            .setFields([
              {
                name: "**Date Created**",
                value: `Server Created on **${message.guild?.createdAt.toLocaleString()}**`,
              },
              {
                name: "**Owner**",
                value: `The Owner of This Server is **${name}**`,
              },
              {
                name: "**Member Count**",
                value:
                  "This Server Has ` " +
                  String(message.guild?.memberCount) +
                  " ` **Members**",
              },
              {
                name: "**Emoji Count**",
                value:
                  "This Server Has ` " +
                  String(message.guild?.emojis.cache.size) +
                  " ` **Emojis**",
              },
              {
                name: "**Roles Count**",
                value:
                  "This Server Has ` " +
                  String(message.guild?.roles.cache.size) +
                  " ` **Roles**",
              },
              {
                name: "**Channels Count**",
                value:
                  "This Server Has ` " +
                  String(message.guild?.channels.cache.size) +
                  " ` **Channels**",
              },
            ])
            .setTimestamp();

          message.channel.send({ embeds: [ServerInfoEmbed] });
        })
        .catch((err: Error) => {
          log("error", "Discord", "Error while fetching user: " + err.name);
          errorLog(err);
        });
    }
  },
};
