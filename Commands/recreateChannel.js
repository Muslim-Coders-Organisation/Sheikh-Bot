"use strict";
exports.__esModule = true;
exports.resetChannel = void 0;
var discord = require("discord.js");
exports.resetChannel = {
    title: 'Reset Channel',
    description: 'Resets the channel, deletes all the messages [ Clones the channel and deletes the current one ]',
    category: "moderation-admin",
    command: function command(message) {
        if (message.member.permissions.has(discord.Permissions.FLAGS.ADMINISTRATOR)) {
            message.channel.clone().then(function (x) { x.send('Channel has been reset'); })["catch"](console.error);
            message.channel["delete"]().then(function (x) { })["catch"](console.error);
        }
        else {
            message.channel.send("You aren't based enough to use the command :)");
        }
    }
};
