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
exports.arayah = void 0;
var embed_1 = require("./embed");
var axios_1 = require("axios");
exports.arayah = {
    title: 'Getting Ayah in Arabic',
    description: 'fetching a particular ayah from the Quran Surah Number:Ayah Number',
    category: "islamic",
    command: function getingAyah(message) {
        var _this = this;
        if (message.content.split(' ').length > 1) {
            var ayah = message.content.split(' ')[1];
            var ayatCheck = /[123456789:]/;
            if (!ayah.match(ayatCheck)) {
                message.channel.send({
                    embed: embed_1.CreateEmbed('fail', 'Error', '', 'Use the format surah:ayah number where both are numbers big brain', [], 'hmm', '')
                });
            }
            else {
                // send
                axios_1["default"]({
                    method: 'get',
                    url: "http://api.alquran.cloud/v1/ayah/" + ayah + "/ar"
                })
                    .then(function (response) {
                    var _a;
                    return __awaiter(this, void 0, void 0, function () {
                        var resp;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, response.data];
                                case 1:
                                    resp = _b.sent();
                                    if (!(resp.code == 200)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, resp];
                                case 2:
                                    _b.sent();
                                    message.channel.send({
                                        embed: embed_1.CreateEmbed('success', (_a = resp.data.surah) === null || _a === void 0 ? void 0 : _a.name, '', resp.data.text, [], 'page number: ' + resp.data.page, '')
                                    });
                                    _b.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                })["catch"](function (err) { return __awaiter(_this, void 0, void 0, function () {
                    var resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (err === null || err === void 0 ? void 0 : err.response.data)];
                            case 1:
                                resp = _a.sent();
                                if (resp.status) {
                                    message.channel.send({ embed: embed_1.CreateEmbed('fail', resp.status, '', resp.data, [], 'Try again', '') });
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
    }
};
