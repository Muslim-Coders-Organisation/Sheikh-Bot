import * as discord from 'discord.js'
import { command } from './int'

export const BanUser: command = {
    title: 'Bans the User',
    description: 'Bans the mentioned user',
    category: 'moderation-general',
    command: function command(message: any) {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send("You aren't based enough to use this command [Reality ")
        }

        else {
            const user = message.mentions.users.first();
            if (user) {

                const member = message.guild.member(user);
                // check if reason is provided
                if (member) {
                    if (message.content.split(' ').length == 2) {
                        member
                            .ban({ reason: '' })
                            .then(() => {
                                message.reply(`Successfully Banned ${user.tag}`);
                            })
                            .catch((err: any) => {
                                message.reply('I was unable to ban the member');

                                console.error(err);
                            });
                    }
                    else if (message.content.split(' ').length > 2) {
                        let reason: string = ''
                        for (let i = 2; i < message.content.split(' ').length; i++) {
                            reason += message.content.split(' ')[i]
                            reason += ' '
                        }
                        member
                            .ban({ reason: reason })
                            .then(() => {
                                message.reply(`Successfully Banned ${user.tag}`);
                            })
                            .catch((err: any) => {
                                message.reply('I was unable to ban the member');

                                console.error(err);
                            });
                    }


                } else {
                    message.reply("That user isn't in this guild!");
                }
            } else {
                message.reply("You didn't mention the user to ban!");
            }
        }
    }
}