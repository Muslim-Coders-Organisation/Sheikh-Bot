"use strict";
exports.__esModule = true;
exports.Avatar = void 0;
var discord = require("discord.js");
exports.Avatar = {
    title: 'Avatar',
    description: "Returns the avatar of the author, or the one mentioned or who's id is passed",
    category: 'general',
    command: function command(message, client) {
        var user = message.author;
        if (message.content.split(' ').length == 1) {
            var embed = new discord.MessageEmbed()
                .setAuthor("Your Avatar")
                .setImage("https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=256")
                .setColor('RANDOM');
            message.reply(embed);
        }
        else if (message.mentions.users.first()) {
            user = message.mentions.users.first();
            var embed = new discord.MessageEmbed()
                .setAuthor("Your Avatar")
                .setImage("https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=256")
                .setColor('RANDOM');
            message.reply(embed);
        }
        else if (message.content.split(' ').length == 2) {
            client.users.fetch(message.content.split(' ')[1]).then(function (user) {
                var embed = new discord.MessageEmbed()
                    .setAuthor("Your Avatar")
                    .setImage("https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=256")
                    .setColor('RANDOM');
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
                message.channel.send({ embeds: errorEmbed });
            });
        }
    }
};
