// Imports
import * as Discord from "discord.js";
import { Intents } from "discord.js";
import * as dotenv from "dotenv";

// commandsy
import { resetChannel } from "../Commands/recreateChannel";
import { configPrefix } from "../Commands/config-prefix";
import { BanUser } from "../Commands/ban";
import { ayah } from "../Commands/ayah";
import { arayah } from "../Commands/arabicayah";
import { warnUser } from "../Commands/warn";
import { CreateEmbed } from "../Commands/embed";
import { KickUser } from "../Commands/kick";
import { memberCount } from "../Commands/membercount";
import { Purge } from "../Commands/purge";
import { Unban } from "../Commands/unban";
import { serverInfo } from "../Commands/server-info";
import { Avatar } from "../Commands/avatar";
import { userInfo } from "../Commands/userinfo";
import { VerifyCreate } from "../Commands/verification";
import Database from './connect_db';
import log from "./logger";
import { getConnection } from "typeorm";
import { Prefixes } from './../Database/entities/prefix'

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
