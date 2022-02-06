import { Message, MessageEmbed } from "discord.js";
import { getConnection } from "typeorm";
import { Schedules } from "../../Database/entities/schedules";
import * as inter from "../int";
export const devstat: inter.command = {
    title: "developer command to get bot statistics",
    description: "Get the bot statistics such as timings",
    category: "moderation-admin",
    command: (message: Message) => {
        message.channel.send("Gathering statistics...");
        let e = new MessageEmbed()
        e.setTitle("Developer Statistics")
        const now = Date.now()
        const test = getConnection().getRepository(Schedules).createQueryBuilder("p").select("p.scheduleName").where("p.guildIdentifier = 0").getMany()
        const time = Date.now() - now;
        e.addField("Process Information", `Node.js ${process.version}\nUptime: ${process.uptime().toFixed(2)} seconds`, false)
        e.addField("CPU Used", `CPU: ${process.cpuUsage().user}\nIPC Sent: ${process.resourceUsage().ipcSent}\nIPC Received: ${process.resourceUsage().ipcReceived}`, true)
        e.addField("Memory Used", `RSS: ${process.memoryUsage.rss() / 1000} KB\nMax RSS: ${process.resourceUsage().maxRSS}`, true)
        e.addField("Disk I/O", `Read: ${process.resourceUsage().fsRead}\nWrite: ${process.resourceUsage().fsWrite}`)
        e.addField("Database Latency", String(time) + "ms", true)
        e.addField("Bot Latency", (String(Date.now() - message.createdTimestamp)) + "ms", true)
        e.setFooter("CPU Usage is for the entire user. In a docker environment, this should be roughly what the bot takes. For a non-docker environment, please ignore it.")
        message.reply({ embeds: [e] })
    }
}
