import { Message, MessageEmbed, Permissions } from "discord.js";
import { getConnection } from "typeorm";
import { Schedules } from "../../Database/entities/schedules";
import { addToRuntimeJSON, deleteFromRuntimeJSON } from "../../Events/schedulerRunner";
import log, { errorLog } from "../../General/logger";
import * as embed from "../embed";
import * as inter from "../int";

export const schedule: inter.command = {
    title: "Schedule",
    description: "Sets new job schedules",
    category: "moderation-general",
    command: async function command(message: Message) {
        if (message.content.split(' ')[1]) {
            switch (message.content.split(' ')[1]) {

                case 'create':
                    try {
                        if (message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                            let args: string[] = []
                            let toBeSentArray: any[] = []
                            args.push(message.content.split(" ")[2])
                            args.push(message.content.split(" ")[3])
                            args.push(message?.mentions?.channels?.first()?.id || "")
                            args.push(message.content.split(" ").slice(5).join(" "))
                            args[3] = args[3].replace(/```/g, "")

                            if (!args[0] || !args[1] || !args[2] || !args[3]) {
                                fail(message)
                                return
                            }
                            const res = await getConnection().getRepository(Schedules)
                                .createQueryBuilder("p")
                                .select("p.scheduleName")
                                .where("p.scheduleName = :name", { name: args[0] })
                                .andWhere("p.guildIdentifier = :guild", { guild: message.guild?.id })
                                .getRawOne()
                            if (res != undefined) {
                                message.channel.send("A schedule with that name already exists.")
                                return;
                            }
                            if (args[0].length > 20) {
                                message.channel.send("The name of the schedule is a too long, shorten it a bit. (Less than 20 characters)");
                                return;
                            } else toBeSentArray.push(args[0])


                            if (args[1].endsWith("s")) {
                                toBeSentArray.push(parseInt(args[1].replace("s", "")) / 60)
                            } else if (args[1].endsWith("m")) {
                                toBeSentArray.push(parseInt(args[1].replace("m", "")) * 1)
                            } else if (args[1].endsWith("h")) {
                                toBeSentArray.push(parseInt(args[1].replace("h", "")) * 60)
                            } else if (args[1].endsWith("d")) {
                                toBeSentArray.push(parseInt(args[1].replace("d", "")) * 60 * 24)
                            } else if (args[1].endsWith("w")) {
                                toBeSentArray.push(parseInt(args[1].replace("w", "")) * 60 * 24 * 7)
                            } else if (args[1].endsWith("mo")) {
                                toBeSentArray.push(parseInt(args[1].replace("mo", "")) * 60 * 24 * 30)
                            }
                            else if (args[1].endsWith("y")) {
                                toBeSentArray.push(parseInt(args[1].replace("y", "")) * 60 * 24 * 365)
                            } else {
                                message.channel.send("The schedule interval is not valid, use a valid time unit. \n Supported units are: s, m, h, d, w, mo, y");
                                return;
                            }
                            if (message?.mentions?.channels?.first()?.id === undefined) {
                                fail(message)
                                return;
                            } else {
                                if (!message.guild?.channels.cache.has(message?.mentions?.channels?.first()?.id || "")) {
                                    fail(message)
                                    return;
                                }
                            }
                            toBeSentArray.push(args[2])
                            if (args[3]) {
                                toBeSentArray.push(args[3])
                            } else {
                                fail(message)
                                return;
                            }
                            if (toBeSentArray[3].length > 2000) {
                                fail(message)
                                return;
                            }

                            let schedule = new Schedules()
                            schedule.channelIdentifier = toBeSentArray[2]
                            schedule.guildIdentifier = message.guild?.id
                            schedule.scheduleName = toBeSentArray[0]
                            schedule.enabled = false
                            schedule.interval = toBeSentArray[1]
                            schedule.message = toBeSentArray[3]
                            getConnection().getRepository(Schedules).save(schedule).then(() => {
                                message.channel.send("Schedule has been created successfully")
                                const e = new MessageEmbed()
                                    .setTimestamp()
                                    .setTitle("Schedule has been created successfully")
                                    .setDescription("Your schedule is currently disabled. to enable, run `schedule toggle " + schedule.scheduleName + "`")
                                    .addFields([
                                        { name: "Name", value: schedule.scheduleName, inline: true },
                                        { name: "Interval", value: schedule.interval.toString() + ' minutes', inline: true },
                                        { name: "Channel", value: `<#${schedule.channelIdentifier}>`, inline: true }
                                    ])
                                if (!message?.guild?.id) return;
                                message.channel.send({ embeds: [e] })
                            }).catch((err: Error) => {
                                log('error', 'Discord/Database', "Error while creating schedule")
                                errorLog(err, false)
                                message.channel.send("An error occured while creating the schedule, please try again later")
                            })
                        } else {
                            message.channel.send("You don't have permission to use this command")
                        }

                    } catch (e: Error | unknown) {
                        if (e instanceof Error) {
                            log('error', 'Discord', 'Error while scheduling a job: ' + e?.name + e?.message)
                        } else {
                            log('error', 'Discord', 'Error while scheduling a job. Error name not available')
                        }
                        errorLog(e);
                        message.channel.send("Something went wrong while scheduling the job. Please try again later.");
                    }
                    return;
                case 'delete':
                    if (message.content.split(' ')[2]) {
                        const name = message.content.split(' ')[2]
                        const check = await getConnection().getRepository(Schedules).findOne({
                            scheduleName: name,
                            guildIdentifier: message.guild?.id
                        })
                        if (check === undefined) {
                            message.channel.send("That schedule doesn't exist in this guild.")
                            return;
                        }
                        getConnection().getRepository(Schedules).delete({ guildIdentifier: check.guildIdentifier, scheduleName: check.scheduleName }).then(() => {
                            message.channel.send("Schedule has been deleted successfully")
                            if (!message?.guild?.id) return;
                            deleteFromRuntimeJSON(name, message.guild?.id)
                        }).catch((err: Error) => {
                            errorLog(err, false)
                            message.channel.send("An error occured while deleting the schedule, please try again later")
                            log('error', 'Discord/Database', "Error while deleting schedule")
                        })
                    } else {
                        message.channel.send("You didn't mention a name to delete")
                    }
                    return;
                case 'toggle':
                    if (message.content.split(' ')[2]) {
                        const name = message.content.split(' ')[2]
                        const check = await getConnection().getRepository(Schedules).findOne({
                            scheduleName: name,
                            guildIdentifier: message.guild?.id
                        })
                        if (check === undefined) {
                            message.channel.send("That schedule doesn't exist in this guild.")
                            return;
                        }
                        if (check.enabled) {
                            getConnection().getRepository(Schedules).update({ scheduleName: name, guildIdentifier: message?.guild?.id }, { enabled: false }).then(() => {
                                message.channel.send("Schedule has been disabled successfully")
                                if (!message?.guild?.id) return;
                                if (message && message.guild && message.guild.id) {
                                    deleteFromRuntimeJSON(name, message.guild.id)
                                }
                            }).catch((err: Error) => {
                                errorLog(err.stack, false)
                                message.channel.send("An error occured while disabling the schedule, please try again later")
                                log('error', 'Discord/Database', "Error while disabling schedule")
                            })
                        } else {
                            getConnection().getRepository(Schedules).update({ scheduleName: name, guildIdentifier: message?.guild?.id }, { enabled: true }).then(() => {
                                message.channel.send("Schedule has been enabled successfully")
                                if (!message?.guild?.id) return;
                                addToRuntimeJSON(name, Number(check.interval), check.channelIdentifier, check.message, message.guild?.id)
                            }).catch((err: Error) => {
                                errorLog(err, false)
                                message.channel.send("An error occured while enabling the schedule, please try again later")
                                log('error', 'Discord/Database', "Error while enabling schedule")
                            })
                        }
                    } else {
                        message.channel.send("You didn't mention a name to toggle")
                        return;
                    }
                    return;
                case 'list':
                    const schedules = await getConnection().getRepository(Schedules).find({
                        guildIdentifier: message.guild?.id
                    })
                    if (schedules.length === 0) {
                        message.channel.send("There are no schedules in this guild")
                        return;
                    }
                    const embed = new MessageEmbed()
                        .setTimestamp()
                        .setTitle("Schedules in this guild")
                        .setDescription("To enable a schedule, run `schedule toggle <name>`")
                    for (const schedule of schedules) {
                        embed.addFields([
                            { name: "Name", value: schedule.scheduleName, inline: true },
                            { name: "Interval", value: schedule.interval.toString() + ' minutes', inline: true },
                            { name: "Channel", value: `<#${schedule.channelIdentifier}>`, inline: true },
                        ])
                    }
                    message.channel.send({ embeds: [embed] })
                    return;
                case 'content':
                    if (message.content.split(' ')[2]) {
                        const name = message.content.split(' ')[2]
                        const check = await getConnection().getRepository(Schedules).findOne({
                            scheduleName: name,
                            guildIdentifier: message.guild?.id
                        })
                        if (check === undefined) {
                            message.channel.send("That schedule doesn't exist in this guild.")
                        } else {
                            const embed = new MessageEmbed()
                                .setTimestamp()
                                .setTitle("Schedule content")
                                .setDescription(check.message)
                            message.channel.send({ embeds: [embed] })  
                        }
                    } else {
                        message.channel.send("You didn't mention a name to view the contents of")
                    }
                    return;
                default:
                    message.channel.send("Invalid command")
                    return;
            }
        } else {
            message.channel.send("You need to include an action. \nActions: create, delete, toggle")
        }
    }
}

function fail(message: Message) {
    const e = new MessageEmbed()
        .setTitle("Incorrect syntax")
        .setDescription("Correct syntax: `schedule create <name> <interval> <channel> <message>`")
        .setTimestamp()
    message.channel.send({ embeds: [e] })
}