"use strict";
exports.__esModule = true;
exports.KickUser = void 0;
var discord = require("discord.js");
exports.KickUser = {
    title: 'Kicks the User',
    description: 'Kicks the mentioned user',
    category: 'moderation-general',
    command: function command(message) {
        if (!message.member.permissions.has(discord.Permissions.FLAGS.KICK_MEMBERS)) {
            message.channel.send("You aren't based enough to use this command");
        }
        else {
            var user_1 = message.mentions.users.first();
            if (user_1) {
                var member = message.guild.members.fetch(user_1.id)
                    .then(function (member) {
                    if (member) {
                        var msg = message.content.split(' ');
                        var reason = '';
                        if (msg.length > 2) {
                            for (var i = 2; i < msg.length; i++) {
                                reason += msg[i];
                                reason += ' ';
                            }
                        }
                        message.guild.members.kick(member.id, reason)
                            .then(function () {
                            message.reply("Successfully kicked " + user_1.tag);
                        })["catch"](function (err) {
                            message.reply('I was unable to kick the member');
                            console.error(err);
                        });
                    }
                    else {
                        message.reply("That user isn't in this guild!");
                    }
                });
            }
            else {
                message.reply("You didn't mention the user to kick!");
            }
        }
    }
};
