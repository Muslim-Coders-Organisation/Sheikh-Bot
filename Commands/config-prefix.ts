import { Message } from "discord.js";
import { getConnection } from "typeorm";
import { Prefixes } from "../Database/entities/prefix";
import * as inter from "./int";

export const configPrefix: inter.command = {
  title: "Change prefix",
  description:
    "Changes prefix to the one supplied by the user, to use in the server",
  category: "moderation-general",
  command: async function command(message: Message, p: any) {
    let pre =
      message.content.split(" ").length > 2
        ? message.content.split(" ")[2]
        : undefined;
    if (pre == undefined) {
      message.channel.send("You need to specify a prefix");
    }
    let serverid: any = String(message.guild?.id);
    if (p?.prefix) {
      let change = await getConnection().getRepository(Prefixes)
        .createQueryBuilder("p")
        .update()
        .set({ prefix: pre })
        .where("p.guildIdentifier = :guild", { guild: serverid })
      message.channel.send("Prefix successfully changed to " + pre);
    } else {
      getConnection().getRepository(Prefixes).save({guildIdentifier: String(serverid),prefix: pre});
      message.channel.send("Prefix successfully changed to " + pre);
    }
  },
};
