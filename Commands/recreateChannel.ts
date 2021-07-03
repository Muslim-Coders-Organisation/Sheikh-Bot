import * as discord from 'discord.js'
import * as embed from './embed'
import * as inter from './int'

export const resetChannel: inter.command = {
  title: 'Reset Channel',
  description: 'Resets the channel, deletes all the messages [ Clones the channel and deletes the current one ]',
  category: "moderation-admin",
  command: function command(message: any) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.clone().then((x: any) => { }).catch(console.error)
      message.channel.delete().then((x: any) => { }).catch(console.error);
    }
    else {
      message.channel.send("You aren't based enough to use the command :)")
    }
  }
}


