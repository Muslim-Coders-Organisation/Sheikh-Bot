import * as discord from 'discord.js'
import { command } from './int'

export const serverInfo: command = {
    title: 'Server-Info',
    description: 'Returns Information about the server',
    category: 'general',
    command: function command(message: any) {
        const ServerLogo = message.guild.iconURL();
        const ServerInfoEmbed = new discord.MessageEmbed()
            .setColor('#b700ff')
            .setTitle("Server Info")
            .setImage(ServerLogo)
            .setDescription(`About **${message.guild}**`)
            .addField("**Date Created**", `Server Created on **${message.guild.createdAt.toLocaleString()}**`)
            .addField("**Owner**", `The Owner of This Server is ${message.guild.owner}`)
            .addField("**Member Count**", "This Server Has ` " + `${message.guild.memberCount}` + " ` **Members**")
            .addField("**Emoji Count**", "This Server Has ` " + `${message.guild.emojis.cache.size}` + " ` **Emojis**")
            .addField("**Roles Count**", "This Server Has ` " + `${message.guild.roles.cache.size}` + " ` **Roles**")
            .addField("**Channels Count**", "This Server Has ` " + `${message.guild.channels.cache.size}` + " ` **Channels**")
            .addField('Location', message.guild.region, true)
            .setTimestamp()

        message.channel.send(ServerInfoEmbed)
    }
}