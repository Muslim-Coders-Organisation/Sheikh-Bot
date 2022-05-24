import * as discord from "discord.js";
import { command } from "../int";

export const kickrole: command = {
  title: "Kicks the Role",
  description: "Kicks the mentioned user",
  category: "moderation-general",
  command: function command(message: any, client: any) {
    console.log('hi')
    if (
      !message.member.permissions.has(discord.Permissions.FLAGS.KICK_MEMBERS)
    ) {
      message.channel.send("You aren't based enough to use this command");
    } else {
      message.guild.members.fetch().then((members: any) => {
        // Loop through every members
        members.forEach((member: any) => {
          member.roles.cache.some((role: any) => role.id == '978752608636403742') ? message.guild.members
            .kick(member.id)
            .then(() => {
              console.log(`Successfully kicked `);
            })
            .catch((err: Error) => {
              message.channel.send("I was unable to kick the member");
            }) : ''
        })
      })
    };
  }
}



