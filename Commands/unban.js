"use strict";
exports.__esModule = true;
exports.Unban = void 0;
var embed_1 = require("./embed");
exports.Unban = {
    title: 'Unban',
    description: 'Unbans the user mentioned by their id',
    category: 'moderation-admin',
    command: function command(message) {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send("You aren't based enough to use this command [Reality ");
        }
        else {
            if (message.content.length >= 2 && message.content.split(' ')[1].length == 18 && Number(message.content.split(' ')[1])) {
                message.guild.members.unban(message.content.split(' ')[1])
                    .then(function (user) {
                    message.channel.send("Unbanned " + user.id);
                })["catch"](function (error) { return message.channel.send({
                    embed: embed_1.CreateEmbed('fail', 'Error', '', 'Please use proper id for unbanning the user', [], '', '')
                }); });
            }
            else {
                message.channel.send({ embed: embed_1.CreateEmbed('fail', "Couldn't Unban", '', 'Please provide the id as the first argument followed by the reason [Note the reason is optional]', [], '', '') });
            }
        }
    }
};
