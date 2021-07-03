import * as discord from 'discord.js'
import mongoose from 'mongoose'
import * as inter from './int'
import M from '../Database/basic'


export const configPrefix: inter.command = {
  title: 'Change prefix',
  description: 'Changes prefix to the one supplied by the user, to use in the server',
  category: "moderation-general",
  command: async function command(message: any, p: any) {
    let pre = message.content.split(' ').length > 2 ? message.content.split(' ')[2] : undefined
    let serverid: any = String(message.guild?.id)
    if (p?.prefix) {
      let change = await M.findOneAndUpdate({ server_id: serverid }, { 'prefix': pre }, {
        new: true
      })
      message.channel.send('Prefix successfully changed to ' + pre)
    }
    else {
      M.create({
        'server_id': String(serverid),
        'prefix': pre
      })
      message.channel.send('Prefix successfully changed to ' + pre)
    }
  }
}


