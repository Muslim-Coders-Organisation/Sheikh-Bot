// Imports
import * as Discord from "discord.js";
import { Intents } from "discord.js";
import * as dotenv from "dotenv";

// commandsy
import { resetChannel } from "../Commands/moderation/recreateChannel";
import { configPrefix } from "../Commands/moderation/config-prefix";
import { BanUser } from "../Commands/moderation/ban";
import { ayah } from "../Commands/Islamic/ayah";
import { arayah } from "../Commands/Islamic/arabicayah";
import { warnUser } from "../Commands/moderation/warn";
import { KickUser } from "../Commands/moderation/kick";
import { memberCount } from "../Commands/moderation/membercount";
import { Purge } from "../Commands/moderation/purge";
import { Unban } from "../Commands/moderation/unban";
import { serverInfo } from "../Commands/misc/server-info";
import { Avatar } from "../Commands/misc/avatar";
import { userInfo } from "../Commands/misc/userinfo";
import { VerifyCreate } from "../Commands/moderation/verification";
import Database from './connect_db';
import log, { clearLog } from "./logger";
import { getConnection } from "typeorm";
import { Prefixes } from '../Database/entities/prefix'
import { schedule } from "../Commands/moderation/schedule";
import { beginSchedulerLoop } from "../Events/schedulerRunner";
clearLog();
(new Database).connect()

const INTENTS: any = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
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

const definitions: String[] = ['salafism', 'wahabism', "islam"]

client.on("guildMemberAdd", async (member: any) => {
  VerifyCreate.command(member);
});

client.on("messageCreate", async (message) => {
  if (message.channel.type !== "DM") {
    if (message.author.bot == false) {
      let p = await getConnection().getRepository(Prefixes).findOne({ guildIdentifier: String(message?.guild?.id) });
      prefix = p ? p["prefix"] : "<";
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
        /* General Commands */
        if (message.content.toLowerCase() == prefix + "membercount") {
          memberCount.command(message);
        }
        if (message.content.toLowerCase().startsWith(prefix + "serverinfo")) {
          serverInfo.command(message, client);
        }
        if (message.content.toLowerCase().startsWith(prefix + "userinfo")) {
          userInfo.command(message);
        }
        if (message.content.startsWith(prefix + "av")) {
          Avatar.command(message, client);
        }
        /* Islamic Commands */
        if (message.content.startsWith(prefix + "q")) {
          ayah.command(message);
        }

        if (message.content.startsWith(prefix + "aq")) {
          arayah.command(message);
        }

        if (message.content.startsWith(prefix + "schedule")) {
          schedule.command(message);
        }

        if (message.content.startsWith(prefix + 'info')) {
          let arg: string = message.content.split(' ')[1].toLowerCase()
          if (definitions.includes(arg)) {
            require(`../commands/${arg}.ts`).run(undefined, message);

          }
          else {
            message.channel.send(`I do not know what is ${arg}`)
          }
        }


        /* Config Commands */
        if (message.content.startsWith(prefix + "config prefix")) {
          configPrefix.command(message, p);
        }

        /* Normal Moderation Commands */
        if (message.content === prefix + "resetChannel") {
          resetChannel.command(message);
        }
        if (message.content.startsWith(prefix + "purge")) {
          Purge.command(message);
        }
        if (message.content.startsWith(prefix + "kick")) {
          KickUser.command(message);
        } /*
        if (message.content.startsWith(prefix + 'ban')) {
          BanUser.command(message)
        }
        if (message.content.startsWith(prefix + 'unban')) {
          Unban.command(message)
        }*/
        if (message.content === prefix + "trial") {
          const botping = Date.now() - message.createdTimestamp;
          const apiping = Math.round(client.ws.ping);
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Success!")
            .setDescription(
              `Bot Latency: ${botping}ms \nDiscord API Latency: ${apiping}ms`
            );

          message.channel.send({ embeds: [embed] });
        }
        if (message.content.startsWith(prefix + "warn")) {
          warnUser.command(client, message);
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