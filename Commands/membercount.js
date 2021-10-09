"use strict";
exports.__esModule = true;
exports.memberCount = void 0;
var embed_1 = require("./embed");
exports.memberCount = {
    title: 'Membercount',
    description: 'Gives the number of users',
    category: 'general',
    command: function command(message) {
        var _a;
        message.channel.send({ embed: embed_1.CreateEmbed('others', 'Members', '', (_a = message === null || message === void 0 ? void 0 : message.guild) === null || _a === void 0 ? void 0 : _a.memberCount, [], '', '') });
    }
};
