// Imports
import * as Discord from 'discord.js'
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

// commands
import { resetChannel } from '../Commands/recreateChannel';
import { configPrefix } from '../Commands/config-prefix';
import { BanUser } from '../Commands/ban';
import { connect } from './connect_db';
import { ayah } from '../Commands/ayah';
import { arayah } from '../Commands/arabicayah';
import { warnUser } from '../Commands/warn';
import { CreateEmbed } from '../Commands/embed'
import { KickUser } from '../Commands/kick'
import { memberCount } from '../Commands/membercount';
import { Purge } from '../Commands/purge'
import { Unban } from '../Commands/unban'
import { serverInfo } from '../Commands/server-info'
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
      name: `Quran`,
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
      //   console.log()
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

        /* General Commands */
        if (message.content.toLowerCase() == prefix + 'membercount') {

          memberCount.command(message)
        }
        /* Islamic Commands */
        if (message.content.startsWith(prefix + 'q')) {
          ayah.command(message)
        }

        if (message.content.startsWith(prefix + 'aq')) {
          arayah.command(message)
        }

        /* Config Commands */
        if (message.content.startsWith(prefix + 'config prefix')) {
          configPrefix.command(message, p)
        }

        /* Normal Moderation Commands */
        if (message.content === prefix + 'resetChannel') {
          resetChannel.command(message)
        }
        if (message.content.startsWith(prefix + 'purge')) {
          Purge.command(message)
        }
        if (message.content.startsWith(prefix + 'kick')) {
          KickUser.command(message)
        }
        if (message.content.startsWith(prefix + 'ban')) {
          BanUser.command(message)
        }
        if (message.content.startsWith(prefix + 'unban')) {
          Unban.command(message)
        }
        if (message.content.startsWith(prefix + 'serverinfo')) {
          serverInfo.command(message)
        }
        if (message.content === prefix + 'trial') {
          const botping = Date.now() - message.createdTimestamp
          const apiping = Math.round(client.ws.ping)
          message.channel.send({ embed: CreateEmbed("success", "Success!", "", `Bot Latency: ${botping}ms \nDiscord API Latency: ${apiping}ms`, [], "", "") })
        }
        if (message.content.startsWith(prefix + 'warn')) {
          warnUser.command(client, message)
        }
      }

    }
  }
});

client.login(getToken(process));