import * as Discord from 'discord.js'
import * as dotenv from 'dotenv';
import { resetChannel } from '../Commands/recreateChannel';
import { configPrefix } from '../Commands/config-prefix';
import mongoose from 'mongoose';
import { BanUser } from '../Commands/ban';
import { connect } from './connect_db';
import { warnUser } from '../Commands/warn';
import M from '../Database/basic'

console.log(connect())
const process = dotenv.config().parsed
//console.log(process)
const getToken = function (obj: any) {
  const token = obj.token;
  return token
}
const client = new Discord.Client({
  fetchAllMembers: false,
  presence: {
    status: 'online',
    activity: {
      name: `to Quran`,
      type: 'LISTENING'
    }
  }
});

let prefix: String = '<'
// later add an option to change the prefix in the server it is 

client.on('ready', () => {
  console.log(client?.user?.username + ' is active');
});

client.on('message', async message => {
  if (message.channel.type !== "dm") {
    if (message.author.bot == false) {

      /* Normal Text Commands */
      let search = String(message?.guild?.id)
      let p = await M.findOne({ server_id: search })
      prefix = p ? p.prefix : '<'
      if (message.content.toLowerCase() == 'as') {
        await message.channel.send('السَّلاَم عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ')
      }
      if (message.content.toLowerCase() == 'ws') {
        await message.channel.send('وعليكم السلام ، ورحمة الله وبركاته')
      }
      if (message.content.toLowerCase() == 'jzk') {
        await message.channel.send('جَزَاكَ ٱللَّٰهُ خَيْرًا‎')
      }
      if (message.content.toLowerCase() == 'ms') {
        await message.channel.send('   ما شاء الله لا قوة إلا بالله')
      }
      if (message.content.toLowerCase() == 'wi') {
        await message.channel.send('  وَأَنْتُمْ فَجَزَاكُمُ ٱللَّٰهُ خَيْرًا‎')
      }
      if (message.content.toLowerCase() == 'in') {
        await message.channel.send('إن شاء الله')
      }
      if (message.content.startsWith(String(prefix))) {

        /* Config Commands */
        if (message.content.startsWith(prefix + 'config prefix')) {
          configPrefix.command(message, p)
        }

        /* Normal Moderation Commands */
        if (message.content === prefix + 'resetChannel') {
          resetChannel.command(message)
        }

        if (message.content.startsWith(prefix + 'ban')) {
          BanUser.command(message)
        }
        if (message.content === prefix + 'trial') {
          message.channel.send('Success')
        }
        if (message.content.startsWith(prefix + 'warn')) {
          warnUser.command(message)
        }
      }

    }
  }
});

client.login(getToken(process));