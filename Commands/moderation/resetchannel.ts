import { Message, Permissions } from "discord.js";
import log, { errorLog } from "../../General/logger";
import * as inter from "../int";

export const resetchannel: inter.command = {
  title: "Reset Channel",
  description:
    "Resets the channel, deletes all the messages [ Clones the channel and deletes the current one ]",
  category: "moderation-admin",
  command: function command(message: Message) {
    console.log('hey')
    if (
      message?.member?.permissions?.has(Permissions.FLAGS.ADMINISTRATOR)
    ) {
      if (message.channel.type != 'GUILD_TEXT') return;
      message.channel
        .clone()
        .then((x: any) => {
          x.send("Channel has been reset");
        })
        .catch((err: Error) => {
          log("error", "Discord", "Error while resetting channel: " + err.name);
          errorLog(err);
          message.reply("I was unable to reset the channel");
        });
      message.channel
        .delete()
        .then((x: any) => { })
        .catch((err: Error) => {
          log("error", "Discord", "Error while resetting channel: " + err.name);
          errorLog(err);
          message.reply("I was unable to reset the channel");
        });
    } else {
      message.channel.send("You aren't based enough to use the command :)");
    }
  },
};
