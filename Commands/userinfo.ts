import * as discord from 'discord.js'
import { command } from './int'
import { CreateEmbed } from './embed'


export const userInfo: command = {

    title: 'User-Information',
    description: "Returns the information about the author, or the one mentioned or who's id is passed",
    category: 'general',
    command: function command(message: any, client: any) {

        let user: any

        if (message.content.split(' ').length == 1) {
            user = message.author
            const member = message.guild.member(user)
            const activities = [];
            for (const activity of user.presence.activities.values()) {
                switch (activity.type) {
                    case 'PLAYING':
                        activities.push(`Playing **${activity.name}**`);
                        break;
                    case 'LISTENING':
                        if (user.bot) activities.push(`Listening to **${activity.name}**`);
                        else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
                        break;
                    case 'WATCHING':
                        activities.push(`Watching **${activity.name}**`);
                        break;
                    case 'STREAMING':
                        activities.push(`Streaming **${activity.name}**`);
                        break;
                }
            }
            //console.log(user)
            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${user.username}'s Information`)
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .setFooter(`Info from ${message.guild.name}`)
                .setTimestamp()
                .addFields(
                    {
                        name: "User Info",
                        value: "```Username:" + user.username + "\nDiscriminator: #" + user.discriminator + "\nTag: " + user.tag + "\nIs Bot: " + user.bot + "\nID: " + user.id + " ```",
                        inline: true
                    },
                    {
                        name: `Member Info`,
                        value: "```Joined Server: " + new Date(member.joinedTimestamp).toLocaleDateString() + "\nJoined Discord: " + new Date(user.createdTimestamp).toLocaleDateString() + "```",
                        inline: false
                    },
                    {
                        name: `Roles`,
                        value: "" + message.member.roles.cache.map((r: any) => r).join(' | ') + "",
                        inline: true
                    },


                )
            message.reply(embed)
        }
        else if (message.mentions.users.first()) {

            user = message.mentions.users.first()
            const member = message.guild.member(user)

            const activities = [];
            for (const activity of user.presence.activities.values()) {
                switch (activity.type) {
                    case 'PLAYING':
                        activities.push(`Playing **${activity.name}**`);
                        break;
                    case 'LISTENING':
                        if (user.bot) activities.push(`Listening to **${activity.name}**`);
                        else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
                        break;
                    case 'WATCHING':
                        activities.push(`Watching **${activity.name}**`);
                        break;
                    case 'STREAMING':
                        activities.push(`Streaming **${activity.name}**`);
                        break;
                }
            }
            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${user.username}'s Information`)
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .setFooter(`Info from ${message.guild.name}`)
                .setTimestamp()
                .addFields(
                    {
                        name: "User Info",
                        value: "```Username:" + user.username + "\nDiscriminator: #" + user.discriminator + "\nTag: " + user.tag + "\nServer Nickname: " + member.displayName + "\nIs Bot: " + user.bot + "\nID: " + user.id + " ```",
                        inline: true
                    },
                    {
                        name: `Member Info`,
                        value: "```Joined Server: " + new Date(member.joinedTimestamp).toLocaleDateString() + "\nJoined Discord: " + new Date(user.createdTimestamp).toLocaleDateString() + "```",
                        inline: false
                    },
                    {
                        name: `Roles`,
                        value: "" + message.member.roles.cache.map((r: any) => r).join(' | ') + "",
                        inline: true
                    },


                )
            message.reply(embed)
        }
        else if (message.content.split(' ').length == 2) {
            client.users.fetch(message.content.split(' ')[1]).then(function (user: any) {
                const activities = [];
                const member = message.guild.member(user)
                // console.log(member)
                for (const activity of user.presence.activities.values()) {
                    switch (activity.type) {
                        case 'PLAYING':
                            activities.push(`Playing **${activity.name}**`);
                            break;
                        case 'LISTENING':
                            if (user.bot) activities.push(`Listening to **${activity.name}**`);
                            else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
                            break;
                        case 'WATCHING':
                            activities.push(`Watching **${activity.name}**`);
                            break;
                        case 'STREAMING':
                            activities.push(`Streaming **${activity.name}**`);
                            break;
                    }
                }
                const embed = new discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${user.username}'s Information`)
                    .setThumbnail(user.avatarURL({ dynamic: true }))
                    .setFooter(`Info from ${message.guild.name}`)
                    .setTimestamp()
                    .addFields(
                        {
                            name: "User Info",
                            value: "```Username:" + user.username + "\nDiscriminator: #" + user.discriminator + "\nTag: " + user.tag + "\nServer Nickname: " + member.displayName + "\nIs Bot: " + user.bot + "\nID: " + user.id + " ```",
                            inline: true
                        },
                        {
                            name: `Member Info`,
                            value: "```Joined Server: " + new Date(member.joinedTimestamp).toLocaleDateString() + "\nJoined Discord: " + new Date(user.createdTimestamp).toLocaleDateString() + "```",
                            inline: false
                        },
                        {
                            name: `Roles`,
                            value: "" + message.member.roles.cache.map((r: any) => r).join(' | ') + "",
                            inline: true
                        },


                    )
                message.reply(embed)
            }).catch((x: any) => {
                const errorEmbed = new discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle("Failed")
                    .addFields(
                        {
                            name: "ID not found",
                            value: `Seems like the user id you provided wasn't right, please try again witht he correct id`,
                        }
                    )
                    .setFooter("Try again");
                message.channel.send({ embed: errorEmbed })
            })
        }
    }
}