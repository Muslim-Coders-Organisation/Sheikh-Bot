"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// Imports
var Discord = require("discord.js");
var dotenv = require("dotenv");
// commandsy
var recreateChannel_1 = require("../Commands/recreateChannel");
var config_prefix_1 = require("../Commands/config-prefix");
var ban_1 = require("../Commands/ban");
var connect_db_1 = require("./connect_db");
var ayah_1 = require("../Commands/ayah");
var arabicayah_1 = require("../Commands/arabicayah");
var warn_1 = require("../Commands/warn");
var embed_1 = require("../Commands/embed");
var kick_1 = require("../Commands/kick");
var membercount_1 = require("../Commands/membercount");
var purge_1 = require("../Commands/purge");
var unban_1 = require("../Commands/unban");
var server_info_1 = require("../Commands/server-info");
var avatar_1 = require("../Commands/avatar");
var userinfo_1 = require("../Commands/userinfo");
var basic_1 = require("../Database/basic");
console.log(connect_db_1.connect());
var process = dotenv.config().parsed;
//console.log(process)
var getToken = function (obj) {
    var token = obj.token;
    return token;
};
var client = new Discord.Client({
    fetchAllMembers: false,
    presence: {
        status: 'online',
        activity: {
            name: "Quran",
            type: 'LISTENING'
        }
    }
});
var prefix = '<';
// later add an option to change the prefix in the server it is 
client.on('ready', function () {
    var _a;
    console.log(((_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.username) + ' is active');
});
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var search, p, botping, apiping;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(message.channel.type !== "dm")) return [3 /*break*/, 14];
                if (!(message.author.bot == false)) return [3 /*break*/, 14];
                search = String((_a = message === null || message === void 0 ? void 0 : message.guild) === null || _a === void 0 ? void 0 : _a.id);
                return [4 /*yield*/, basic_1["default"].findOne({ server_id: search })];
            case 1:
                p = _b.sent();
                prefix = p ? p['prefix'] : '<';
                if (!(message.content.toLowerCase() == 'as')) return [3 /*break*/, 3];
                return [4 /*yield*/, message.channel.send('السَّلاَم عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ')];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                if (!(message.content.toLowerCase() == 'ws')) return [3 /*break*/, 5];
                return [4 /*yield*/, message.channel.send('وعليكم السلام ، ورحمة الله وبركاته')];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                if (!(message.content.toLowerCase() == 'jzk')) return [3 /*break*/, 7];
                return [4 /*yield*/, message.channel.send('جَزَاكَ ٱللَّٰهُ خَيْرًا‎')];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                if (!(message.content.toLowerCase() == 'ms')) return [3 /*break*/, 9];
                return [4 /*yield*/, message.channel.send('   ما شاء الله لا قوة إلا بالله')];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                if (!(message.content.toLowerCase() == 'wi')) return [3 /*break*/, 11];
                return [4 /*yield*/, message.channel.send('  وَأَنْتُمْ فَجَزَاكُمُ ٱللَّٰهُ خَيْرًا‎')];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11:
                if (!(message.content.toLowerCase() == 'in')) return [3 /*break*/, 13];
                return [4 /*yield*/, message.channel.send('إن شاء الله')];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13:
                if (message.content.startsWith(String(prefix))) {
                    /* General Commands */
                    if (message.content.toLowerCase() == prefix + 'membercount') {
                        membercount_1.memberCount.command(message);
                    }
                    if (message.content.startsWith(prefix + 'serverinfo')) {
                        server_info_1.serverInfo.command(message);
                    }
                    if (message.content.startsWith(prefix + 'userinfo')) {
                        userinfo_1.userInfo.command(message, client);
                    }
                    if (message.content.startsWith(prefix + 'av')) {
                        avatar_1.Avatar.command(message, client);
                    }
                    /* Islamic Commands */
                    if (message.content.startsWith(prefix + 'q')) {
                        ayah_1.ayah.command(message);
                    }
                    if (message.content.startsWith(prefix + 'aq')) {
                        arabicayah_1.arayah.command(message);
                    }
                    /* Config Commands */
                    if (message.content.startsWith(prefix + 'config prefix')) {
                        config_prefix_1.configPrefix.command(message, p);
                    }
                    /* Normal Moderation Commands */
                    if (message.content === prefix + 'resetChannel') {
                        recreateChannel_1.resetChannel.command(message);
                    }
                    if (message.content.startsWith(prefix + 'purge')) {
                        purge_1.Purge.command(message);
                    }
                    if (message.content.startsWith(prefix + 'kick')) {
                        kick_1.KickUser.command(message);
                    }
                    if (message.content.startsWith(prefix + 'ban')) {
                        ban_1.BanUser.command(message);
                    }
                    if (message.content.startsWith(prefix + 'unban')) {
                        unban_1.Unban.command(message);
                    }
                    if (message.content === prefix + 'trial') {
                        botping = Date.now() - message.createdTimestamp;
                        apiping = Math.round(client.ws.ping);
                        message.channel.send({ embed: embed_1.CreateEmbed("success", "Success!", "", "Bot Latency: " + botping + "ms \nDiscord API Latency: " + apiping + "ms", [], "", "") });
                    }
                    if (message.content.startsWith(prefix + 'warn')) {
                        warn_1.warnUser.command(client, message);
                    }
                }
                _b.label = 14;
            case 14: return [2 /*return*/];
        }
    });
}); });
client.login(getToken(process));
