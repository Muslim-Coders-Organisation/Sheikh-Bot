import * as discord from 'discord.js'
import { command } from './int'

export const Purge: command = {
    title: 'Purge',
    description: 'Purges all the messages mentioned [ messages should be within 14 days ]',
    category: "moderation-general",
    command: function command(message: any) {
        if (message.content.split(' ').length == 2 && Number(message.content.split(' ')[1]) && message.member.permissions.has(discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
            let num: Number = Number(message.content.split(' ')[1])
            message.channel.bulkDelete(num)
                .then((x: any) => message.channel.send(`${num} messages has been deleted`))
                .catch((error: any) => message.channel.send("Messages older than 14 days can't be deleted"))
        }
        else {
            const errorEmbed = new discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle("Failed")
                .addFields(
                    {
                        name: "Improper use of the purge command",
                        value: `Message starts with ;purge followed by number of messages`,
                    }
                )
                .setFooter("Try again");
            message.channel.send({ embed: errorEmbed })

        }
    }
}