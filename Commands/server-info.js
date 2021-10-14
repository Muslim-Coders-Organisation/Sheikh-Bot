"use strict";
exports.__esModule = true;
exports.serverInfo = void 0;
var discord = require("discord.js");
exports.serverInfo = {
    title: 'Server-Info',
    description: 'Returns Information about the server',
    category: 'general',
    command: function command(message, client) {
        var name = '';
        client.users.fetch(message.guild.ownerId).then(function (user) {
            name = user.username + '#' + user.discriminator;
            var ServerLogo = message.guild.iconURL();
            var ServerInfoEmbed = new discord.MessageEmbed()
                .setColor('#b700ff')
                .setTitle("Server Info")
                .setImage(ServerLogo)
                .setDescription("About **" + message.guild.name + "**")
                .setFields([
                { name: "**Date Created**", value: "Server Created on **" + message.guild.createdAt.toLocaleString() + "**" },
                { name: "**Owner**", value: "The Owner of This Server is **" + name + "**" },
                { name: "**Member Count**", value: "This Server Has ` " + String(message.guild.memberCount) + " ` **Members**" },
                { name: "**Emoji Count**", value: "This Server Has ` " + String(message.guild.emojis.cache.size) + " ` **Emojis**" },
                { name: "**Roles Count**", value: "This Server Has ` " + String(message.guild.roles.cache.size) + " ` **Roles**" },
                { name: "**Channels Count**", value: "This Server Has ` " + String(message.guild.channels.cache.size) + " ` **Channels**" },
            ])
                .setTimestamp();
            message.channel.send({ embeds: [ServerInfoEmbed] });
        })["catch"](console.error);
    }
};
