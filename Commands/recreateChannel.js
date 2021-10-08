"use strict";
exports.__esModule = true;
exports.resetChannel = void 0;
exports.resetChannel = {
    title: 'Reset Channel',
    description: 'Resets the channel, deletes all the messages [ Clones the channel and deletes the current one ]',
    category: "moderation-admin",
    command: function command(message) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.clone().then(function (x) { })["catch"](console.error);
            message.channel["delete"]().then(function (x) { })["catch"](console.error);
        }
        else {
            message.channel.send("You aren't based enough to use the command :)");
        }
    }
};
