"use strict";
exports.__esModule = true;
exports.warnUser = void 0;
var discord = require("discord.js");
exports.warnUser = {
    title: 'Warn User',
    description: 'Warns the user mentioned.',
    category: 'moderation-general',
    command: function command(client, message) {
        if (message.content.split(' ')[0] == ';warn' && message.content.split(' ').length > 1 && message.mentions.users.first()) {
            if (message.member.hasPermission("KICK_MEMBERS")) {
                var mod = message.author.tag;
                var cmdArguments = message.content.split(' ');
                var reason = [];
                for (var i = 0; i < cmdArguments.length; i++) {
                    if (i != 0 && i != 1) {
                        reason.push(cmdArguments[i]);
                    }
                }
                if (reason.length == 0) {
                    reason.push('No reason specified');
                }
                var user = message.mentions.users.first();
                if (mod != user) {
                    var warnEmbed = new discord.MessageEmbed()
                        .setColor("#FFA500")
                        .setTitle("You have been warned")
                        .addFields({
                        name: "Event:",
                        value: mod + " has issued a warning to you."
                    }, {
                        name: "Reason:",
                        value: reason.join(' ')
                    })
                        .setFooter("Read the rules and behave nicely :)");
                    message.channel.send('Successfully warned');
                    user.send(warnEmbed)["catch"](function (err) { return console.log(err); });
                }
                else {
                    message.channel.send('Dude you can\'t warn yourself stop wasting my time');
                }
            }
            else {
                var mod = message.author.tag;
                message.channel.send('@' + mod + ' you can\'t warn lol');
            }
        }
        else if (message.content.split(' ')[0] == ';warn' && message.content.split(' ').length > 1) {
            var author_id = message.author.id;
            var cmdArguments = message.content.split(' ');
            var reason = [];
            for (var i = 0; i < cmdArguments.length; i++) {
                if (i != 0 && i != 1) {
                    reason.push(cmdArguments[i]);
                }
            }
            if (reason.length == 0) {
                reason.push('No reason specified');
            }
            var mod = message.author.tag;
            if (author_id != message.content.split(' ')[1]) {
                var warnEmbed_1 = new discord.MessageEmbed()
                    .setColor("#FFA500")
                    .setTitle("You have been warned")
                    .addFields({
                    name: "Event:",
                    value: mod + " has issued a warning to you."
                }, {
                    name: "Reason:",
                    value: reason.join(' ')
                })
                    .setFooter("Read the rules and behave nicely :)");
                client.users.fetch(message.content.split(' ')[1]).then(function (user) {
                    console.log(user);
                    user === null || user === void 0 ? void 0 : user.send({ embed: warnEmbed_1 });
                    message.channel.send('Successfully warned');
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
            else {
                message.channel.send('Dude you can\'t warn yourself stop wasting my time');
            }
        }
        else {
            var errorEmbed = new discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle("Failed")
                .addFields({
                name: "Improper use of the warn command",
                value: "Message starts with ;warn followed by the user then the reason [Note reason is optional ]"
            })
                .setFooter("Try again");
            message.channel.send({ embed: errorEmbed });
        }
    }
};
