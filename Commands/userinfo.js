"use strict";
exports.__esModule = true;
exports.userInfo = void 0;
var discord = require("discord.js");
exports.userInfo = {
    title: 'User-Information',
    description: "Returns the information about the author, or the one mentioned or who's id is passed",
    category: 'general',
    command: function command(message, client) {
        var user;
        if (message.content.split(' ').length == 1) {
            user = message.author;
            var member = message.guild.member(user);
            var activities = [];
            for (var _i = 0, _a = user.presence.activities.values(); _i < _a.length; _i++) {
                var activity = _a[_i];
                switch (activity.type) {
                    case 'PLAYING':
                        activities.push("Playing **" + activity.name + "**");
                        break;
                    case 'LISTENING':
                        if (user.bot)
                            activities.push("Listening to **" + activity.name + "**");
                        else
                            activities.push("Listening to **" + activity.details + "** by **" + activity.state + "**");
                        break;
                    case 'WATCHING':
                        activities.push("Watching **" + activity.name + "**");
                        break;
                    case 'STREAMING':
                        activities.push("Streaming **" + activity.name + "**");
                        break;
                }
            }
            //console.log(user)
            var embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(user.username + "'s Information")
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .setFooter("Info from " + message.guild.name)
                .setTimestamp()
                .addFields({
                name: "User Info",
                value: "```Username:" + user.username + "\nDiscriminator: #" + user.discriminator + "\nTag: " + user.tag + "\nIs Bot: " + user.bot + "\nID: " + user.id + " ```",
                inline: true
            }, {
                name: "Member Info",
                value: "```Joined Server: " + new Date(member.joinedTimestamp).toLocaleDateString() + "\nJoined Discord: " + new Date(user.createdTimestamp).toLocaleDateString() + "```",
                inline: false
            }, {
                name: "Roles",
                value: "" + message.member.roles.cache.map(function (r) { return r; }).join(' | ') + "",
                inline: true
            });
            message.reply(embed);
        }
        else if (message.mentions.users.first()) {
            user = message.mentions.users.first();
            var member = message.guild.member(user);
            var activities = [];
            for (var _b = 0, _c = user.presence.activities.values(); _b < _c.length; _b++) {
                var activity = _c[_b];
                switch (activity.type) {
                    case 'PLAYING':
                        activities.push("Playing **" + activity.name + "**");
                        break;
                    case 'LISTENING':
                        if (user.bot)
                            activities.push("Listening to **" + activity.name + "**");
                        else
                            activities.push("Listening to **" + activity.details + "** by **" + activity.state + "**");
                        break;
                    case 'WATCHING':
                        activities.push("Watching **" + activity.name + "**");
                        break;
                    case 'STREAMING':
                        activities.push("Streaming **" + activity.name + "**");
                        break;
                }
            }
            var embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(user.username + "'s Information")
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .setFooter("Info from " + message.guild.name)
                .setTimestamp()
                .addFields({
                name: "User Info",
                value: "```Username:" + user.username + "\nDiscriminator: #" + user.discriminator + "\nTag: " + user.tag + "\nServer Nickname: " + member.displayName + "\nIs Bot: " + user.bot + "\nID: " + user.id + " ```",
                inline: true
            }, {
                name: "Member Info",
                value: "```Joined Server: " + new Date(member.joinedTimestamp).toLocaleDateString() + "\nJoined Discord: " + new Date(user.createdTimestamp).toLocaleDateString() + "```",
                inline: false
            }, {
                name: "Roles",
                value: "" + message.member.roles.cache.map(function (r) { return r; }).join(' | ') + "",
                inline: true
            });
            message.reply(embed);
        }
        else if (message.content.split(' ').length == 2) {
            client.users.fetch(message.content.split(' ')[1]).then(function (user) {
                var activities = [];
                var member = message.guild.member(user);
                // console.log(member)
                for (var _i = 0, _a = user.presence.activities.values(); _i < _a.length; _i++) {
                    var activity = _a[_i];
                    switch (activity.type) {
                        case 'PLAYING':
                            activities.push("Playing **" + activity.name + "**");
                            break;
                        case 'LISTENING':
                            if (user.bot)
                                activities.push("Listening to **" + activity.name + "**");
                            else
                                activities.push("Listening to **" + activity.details + "** by **" + activity.state + "**");
                            break;
                        case 'WATCHING':
                            activities.push("Watching **" + activity.name + "**");
                            break;
                        case 'STREAMING':
                            activities.push("Streaming **" + activity.name + "**");
                            break;
                    }
                }
                var embed = new discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(user.username + "'s Information")
                    .setThumbnail(user.avatarURL({ dynamic: true }))
                    .setFooter("Info from " + message.guild.name)
                    .setTimestamp()
                    .addFields({
                    name: "User Info",
                    value: "```Username:" + user.username + "\nDiscriminator: #" + user.discriminator + "\nTag: " + user.tag + "\nServer Nickname: " + member.displayName + "\nIs Bot: " + user.bot + "\nID: " + user.id + " ```",
                    inline: true
                }, {
                    name: "Member Info",
                    value: "```Joined Server: " + new Date(member.joinedTimestamp).toLocaleDateString() + "\nJoined Discord: " + new Date(user.createdTimestamp).toLocaleDateString() + "```",
                    inline: false
                }, {
                    name: "Roles",
                    value: "" + message.member.roles.cache.map(function (r) { return r; }).join(' | ') + "",
                    inline: true
                });
                message.reply(embed);
            })["catch"](function (x) {
                var errorEmbed = new discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle("Failed")
                    .addFields({
                    name: "ID not found",
                    value: "Seems like the user id you provided wasn't right, please try again witht he correct id"
                })
                    .setFooter("Try again");
                message.channel.send({ embed: errorEmbed });
            });
        }
    }
};
