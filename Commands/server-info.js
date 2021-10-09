"use strict";
exports.__esModule = true;
exports.serverInfo = void 0;
var discord = require("discord.js");
var filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};
var verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
var regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};
exports.serverInfo = {
    title: 'Server-Info',
    description: 'Returns Information about the server',
    category: 'general',
    command: function command(message) {
        var ServerLogo = message.guild.iconURL();
        var ServerInfoEmbed = new discord.MessageEmbed()
            .setColor('#b700ff')
            .setTitle("Server Info")
            .setImage(ServerLogo)
            .setDescription("About **" + message.guild + "**")
            .addField("**Date Created**", "Server Created on **" + message.guild.createdAt.toLocaleString() + "**")
            .addField("**Owner**", "The Owner of This Server is " + message.guild.owner)
            .addField("**Member Count**", "This Server Has ` " + ("" + message.guild.memberCount) + " ` **Members**")
            .addField("**Emoji Count**", "This Server Has ` " + ("" + message.guild.emojis.cache.size) + " ` **Emojis**")
            .addField("**Roles Count**", "This Server Has ` " + ("" + message.guild.roles.cache.size) + " ` **Roles**")
            .addField("**Channels Count**", "This Server Has ` " + ("" + message.guild.channels.cache.size) + " ` **Channels**")
            .addField('Location', message.guild.region, true)
            .setTimestamp();
        message.channel.send(ServerInfoEmbed);
    }
};
