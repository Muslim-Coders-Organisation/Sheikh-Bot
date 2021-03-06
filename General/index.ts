// Imports
import * as Discord from "discord.js";
import { Intents } from "discord.js";
import * as dotenv from "dotenv";

// commandsy



import { VerifyCreate } from "../Commands/moderation/verification";
import Database from './connect_db';
import log, { clearLog } from "./logger";
import { getConnection } from "typeorm";
import { Prefixes } from '../Database/entities/prefix'
import { schedule } from "../Commands/moderation/schedule";
import { beginSchedulerLoop } from "../Events/schedulerRunner";
import { getRandomColorHex } from "../functions/getRandomHex";
import { devstat } from "../Commands/development/statistic";
clearLog();
(new Database).connect()

const INTENTS: any = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MEMBERS

]


const process = dotenv.config().parsed;
const getToken = function (obj: any) {
  const token = obj.token;
  return token;
};
const client = new Discord.Client({
  intents: INTENTS,
});

let prefix: String = "<";
client.on("ready", () => {
  log("info", "Discord", "Connected to Discord under user " + client?.user?.tag);
});

const infoCommands: String[] = ['salafism', 'wahabism', "islam", 'rajab']
const generalCommands: string[] = ["membercount", "serverinfo", "userinfo", "av"]
const moderationCommands: string[] = ["kickrole", "ban", "configprefix", "kick", "purge", 'resetchannel', 'schedule', 'unban', 'warn']

const islamicCommands: string[] = ['q', 'aq']
client.on("guildMemberAdd", async (member: any) => {
  VerifyCreate.command(member);
});

client.on("messageCreate", async (message) => {
  if (message.channel.type !== "DM") {
    if (message.author.bot == false) {
      let p = await getConnection().getRepository(Prefixes).findOne({ guildIdentifier: String(message?.guild?.id) });
      prefix = p ? p["prefix"] : "<";
      console.log(prefix)
      if (message.content.toLowerCase() == "as") {
        await message.channel.send(
          "السَّلاَم عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ"
        );
      }
      if (message.content.toLowerCase() == "ws") {
        await message.channel.send("وعليكم السلام ، ورحمة الله وبركاته");
      }
      if (message.content.toLowerCase() == "jzk") {
        await message.channel.send("جَزَاكَ ٱللَّٰهُ خَيْرًا‎");
      }
      if (message.content.toLowerCase() == "ms") {
        await message.channel.send("   ما شاء الله لا قوة إلا بالله");
      }
      if (message.content.toLowerCase() == "wi") {
        await message.channel.send(
          "  وَأَنْتُمْ فَجَزَاكُمُ ٱللَّٰهُ خَيْرًا‎"
        );
      }
      if (message.content.toLowerCase() == "in") {
        await message.channel.send("إن شاء الله");
      }
      if (message.content.startsWith(String(prefix))) {
        log('info', 'Discord', `Command ${message.content.split(' ')[0].substring(prefix.length, message.content.split(' ')[0].length)} was executed by ${message.author.tag} in guild ${message?.guild?.name}`);
        let cmd: string = message.content.split(" ")[0].replace(String(prefix), "")
        /* General Commands */

        if (generalCommands.includes(cmd)) {
          require(`../Commands/general/${cmd}.ts`)[cmd]['command'](message, undefined, client)
        }
        else if (moderationCommands.includes(cmd)) {
          console.log(require(`../Commands/moderation/${cmd}.ts`)[cmd])
          require(`../Commands/moderation/${cmd}.ts`)[cmd]['command'](message, client)
        }
        else if (message.content.toLowerCase().startsWith(prefix + 'info')) {
          cmd = message.content.toLowerCase().split(' ')[1]

          if (cmd == undefined) {
            message.channel.send(
              `The following options are there for the info command ${infoCommands.join(', ')}`
            )
          }
          else {
            if (infoCommands.includes(cmd)) {
              console.log(cmd)
              require(`../Commands/info/${cmd}.ts`).run(undefined, message)
            }
            else {
              message.channel.send(`I do not know what is ${cmd}`)
            }
          }
        }

        /* Islamic Commands */
        if (islamicCommands.includes(cmd)) {
          let x = cmd == 'q' ? 'ayah' : 'arabicayah';
          console.log(x)
          require(`../Commands/islamic/${x}.ts`)[x]['command'](message)
        }

        if (message.content.startsWith(prefix + "schedule")) {
          schedule.command(message);
        }



        /* Config Commands */

        if (message.content.startsWith(prefix + 'devstat')) {
          devstat.command(message)
        }
        if (message.content === prefix + "trial") {
          const botping = Date.now() - message.createdTimestamp;
          const apiping = Math.round(client.ws.ping);
          const embed = new Discord.MessageEmbed()
            .setColor(getRandomColorHex())
            .setTitle("Success!")
          embed.setDescription(
            `Bot Latency: ${botping}ms \nDiscord API Latency: ${apiping}ms`
          );

          message.channel.send({ embeds: [embed] });
        }
      }
    }
  }
});

client.login(getToken(process));

export function getClient(): Discord.Client {
  return client;
}

beginSchedulerLoop()