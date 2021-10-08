"use strict";
exports.__esModule = true;
exports.BanUser = void 0;
exports.BanUser = {
    title: 'Bans the User',
    description: 'Bans the mentioned user',
    category: 'moderation-general',
    command: function command(message) {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send("You aren't based enough to use this command [Reality ");
        }
        else {
            //  console.log(typeof message.content.split(' ')[1], message.content.split(' ')[1].length == 18, Number(message.content.split(' ')[1]))
            var user_1 = message.mentions.users.first();
            if (user_1) {
                var member = message.guild.member(user_1);
                // check if reason is provided
                if (member) {
                    if (message.content.split(' ').length == 2) {
                        member
                            .ban({ reason: '' })
                            .then(function () {
                            message.reply("Successfully Banned " + user_1.tag);
                        })["catch"](function (err) {
                            message.reply('I was unable to ban the member');
                            console.error(err);
                        });
                    }
                    else if (message.content.split(' ').length > 2) {
                        var reason = '';
                        for (var i = 2; i < message.content.split(' ').length; i++) {
                            reason += message.content.split(' ')[i];
                            reason += ' ';
                        }
                        member
                            .ban({ reason: reason })
                            .then(function () {
                            message.reply("Successfully Banned " + user_1.tag);
                        })["catch"](function (err) {
                            message.reply('I was unable to ban the member');
                            console.error(err);
                        });
                    }
                }
                else {
                    message.reply("That user isn't in this guild!");
                }
            }
            //    else if (message.content.split(' ')[1].length == 18 && Number(message.content.split(' ')[1]) && message.content.split(' ')[0] == ';warn') {
            else {
                var reason = '';
                for (var i = 2; i < message.content.split(' ').length; i++) {
                    reason += message.content.split(' ')[i];
                    reason += ' ';
                }
                if (message.content.split(' ')[1].length == 18) {
                    message.guild ? message.guild.members.ban(message.content.split(' ')[1], { reason: reason })
                        .then(function (user) { return message.reply("Banned " + (user.username || user.id || user) + " from " + message.guild.name); })["catch"](console.error) : '';
                }
                else
                    (message.reply('Please mention the id or the user to ban, thanks :)'));
            }
            /*else {
                message.reply("You didn't mention the user to ban!");
            }*/
        }
    }
};
