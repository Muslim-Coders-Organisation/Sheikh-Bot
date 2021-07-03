import { command } from './int'
import * as discord from 'discord.js'
import { CreateEmbed } from './embed'

export const warnUser: command = {
    title: 'Warn User',
    description: 'Warns the user mentioned.',
    category: 'moderation-general',
    command: function command(message: any) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            const mod = message.author;
            const cmdArguments = message.content.split(' ')
            let reason = []

            for (let i = 0; i < cmdArguments.length; i++) {
                if (i != 0 && i != 1) {
                    reason.push(cmdArguments[i])
                }
            }
            if (reason.length == 0) {
                reason.push('No reason specified')
            }
            const user = message.mentions.users.first();
            if (mod != user) {
                const warnEmbed = new discord.MessageEmbed()
                    .setColor("#FFA500")
                    .setTitle("You have been warned")
                    .addFields(
                        {
                            name: "Event:",
                            value: `${mod} has issued a warning to you.`,
                        },
                        {
                            name: "Reason:",
                            value: reason.join(' '),
                        }
                    )
                    .setFooter("Read the rules and behave nicely :)");
                user.send(warnEmbed).catch((err) => console.log(err));
            }
            else {
                message.channel.send('Dude you can\'t warn yourself stop wasting my time')
            }
        }
        else {
            let mod = message.author.tag
            message.channel.send('@' + mod + ' you can\'t warn lol')
        }
    }
}
