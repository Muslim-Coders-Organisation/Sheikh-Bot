"use strict";
exports.__esModule = true;
exports.Purge = void 0;
var discord = require("discord.js");
exports.Purge = {
    title: 'Purge',
    description: 'Purges all the messages mentioned [ messages should be within 14 days ]',
    category: "moderation-general",
    command: function command(message) {
        if (message.content.split(' ').length == 2 && Number(message.content.split(' ')[1]) && message.member.hasPermission("MANAGE_MESSAGES")) {
            var num_1 = Number(message.content.split(' ')[1]);
            message.channel.bulkDelete(num_1)
                .then(function (x) { return message.channel.send(num_1 + " messages has been deleted"); })["catch"](function (error) { return message.channel.send("Messages older than 14 days can't be deleted"); });
        }
        else {
            var errorEmbed = new discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle("Failed")
                .addFields({
                name: "Improper use of the purge command",
                value: "Message starts with ;purge followed by number of messages"
            })
                .setFooter("Try again");
            message.channel.send({ embed: errorEmbed });
        }
    }
};
