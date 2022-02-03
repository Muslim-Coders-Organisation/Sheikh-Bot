import { GuildChannel, ThreadChannel } from "discord.js"
import { getConnection } from "typeorm"
import { Schedules } from "../Database/entities/schedules"
import { getClient } from "../General"
import log from "../General/logger"

let runtimeJSON: object | any = {

}

export function addToRuntimeJSON(name: string, minutes: number, channel: string, message: string, guild: string) {
    if (!guild) return;
    if (!runtimeJSON[guild]) {
        runtimeJSON[guild] = {}
    }
    runtimeJSON[guild][name] = {
        "runtime": minutes,
        "channel": channel,
        "message": message
    }
}

export function deleteFromRuntimeJSON(name: string, guild: string) {
    if (guild === undefined || guild === null) return;
    delete runtimeJSON[guild][name]
}

export async function beginSchedulerLoop() {
    log('info', "Scheduler", "Awaiting connection to begin schedule loop (1.5s)")
    await new Promise(r => setTimeout(r, 1500))
    log('info', 'Scheduler', "Beginning scheduler loop")

    await getConnection().getRepository(Schedules).createQueryBuilder().getMany().then((rows: Schedules[]) => { 
        for (let i = 0; i != rows.length; i++) {
            addToRuntimeJSON(rows[i].scheduleName, Number(rows[i].interval), rows[i].channelIdentifier, rows[i].message, rows[i].guildIdentifier)
        }
    })
    setInterval(async () => {
        try {
            let i = 0;
            let j = 0;
            await getConnection().getRepository(Schedules).createQueryBuilder().getMany().then((rows: Schedules[]) => {
                for (let row of rows) {
                    i++;
                    if (!row.enabled) continue;
                    if (runtimeJSON[row.guildIdentifier][row.scheduleName]) {
                        runtimeJSON[row.guildIdentifier][row.scheduleName].runtime--;
                        if (runtimeJSON[row.guildIdentifier][row.scheduleName].runtime === 0) {
                            const channel: any = getClient()?.guilds?.cache?.get(row.guildIdentifier)?.channels?.cache?.get(row.channelIdentifier)
                            if (channel === undefined) return;
                            if (channel.type === "GUILD_TEXT") {
                                if (!channel.deleted) {
                                    channel.send(row.message);
                                    j++
                                }
                            }
                            delete runtimeJSON[row.guildIdentifier][row.scheduleName]
                            addToRuntimeJSON(row.scheduleName, Number(row.interval), row.channelIdentifier, row.message, row.guildIdentifier)
                        } 
            
                    } else {
                        if (row.enabled) {
                            addToRuntimeJSON(row.scheduleName, Number(row.interval), row.channelIdentifier, row.message, row.guildIdentifier)
                        }
                    }
                }
            })
            log('info', 'Scheduler', `Looped schedules, ${i} schedules found, ${j} messages sent`)
        } catch (e: Error | unknown) {
            log('warn', "Scheduler", "Error in scheduler")
        }
    }, 60 * 1000)
}