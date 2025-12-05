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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var TOKEN = "7669848828:AAFtHTSAJU3RsKM5fYfBDBpO67lGzDO_CEw";
var botwallet = "TCymMoexTgT2J6UMLq7rScRdj3BjhTM6kL";
var telegraf_1 = require("telegraf");
var engine_1 = require("./engine");
var moment = require("moment-jalaali");
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
var bot = new telegraf_1.Telegraf(TOKEN);
var msToDays = function (ms) { return ms / (24 * 60 * 60 * 1000); };
var translationTable = {
    'q': 'ǫ', 'w': 'ᴡ', 'e': 'ᴇ', 'r': 'ʀ', 't': 'ᴛ',
    'y': 'ʏ', 'u': 'ᴜ', 'i': 'ɪ', 'o': 'ᴏ', 'p': 'ᴘ',
    'a': 'ᴀ', 's': 's', 'd': 'ᴅ', 'f': 'ғ', 'g': 'ɢ',
    'h': 'ʜ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'z': 'ᴢ',
    'x': 'x', 'c': 'ᴄ', 'v': 'ᴠ', 'b': 'ʙ', 'n': 'ɴ',
    'm': 'ᴍ'
};
process.on("uncaughtException", function (uexcept) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.error(uexcept);
        return [2 /*return*/];
    });
}); });
process.on("uncaughtExceptionMonitor", function (uexceptmonitor) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.error(uexceptmonitor);
        return [2 /*return*/];
    });
}); });
process.on("unhandledRejection", function (unhandle) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.error(unhandle);
        return [2 /*return*/];
    });
}); });
bot.telegram.getMe().then(function (me) { console.log(me); });
bot.on("message", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("telegram message:", message.message);
        if (!message.from) {
            return [2 /*return*/];
        }
        if (message.text) {
            if (message.text.startsWith("/start")) {
                (0, engine_1.sendMessage)("getUserById", {
                    id: message.from.id
                }, {
                    message_id: message.msgId,
                    chat_id: message.chat.id,
                    from_id: message.from.id,
                    step: "verifyFrom".concat(message.chat.type)
                });
            }
        }
        return [2 /*return*/];
    });
}); });
engine_1.socket.on("ok", function (submessage) { return __awaiter(void 0, void 0, void 0, function () {
    var _more_txt, bought_on_jalali;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.log(submessage);
                if (!(submessage.method === "getUserById")) return [3 /*break*/, 4];
                if (submessage.user === null) {
                    (0, engine_1.sendMessage)("addUser", { id: submessage.shortcut.from_id });
                }
                if (!(submessage.shortcut.step === "verifyFromprivate")) return [3 /*break*/, 2];
                return [4 /*yield*/, bot.telegram.sendMessage(submessage.shortcut.chat_id, build("🔮 welcome to start panel\n\n☕ would u buy me a coffee ?\n") + "<code>".concat(botwallet, "</code>"), {
                        reply_parameters: {
                            message_id: submessage.shortcut.message_id
                        },
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: build("👛 buy"), callback_data: "buy_".concat(submessage.shortcut.from_id) }, { text: build("🔃 rebuy"), callback_data: "update_".concat(submessage.shortcut.from_id) }],
                                [{ text: build("🧶 buy mode"), callback_data: "buymode_".concat(submessage.shortcut.from_id) }]
                            ]
                        }
                    })];
            case 1: return [2 /*return*/, _d.sent()];
            case 2:
                if (!(submessage.shortcut.step === "verifyFromgroup" || submessage.shortcut.step === "verifyFromsupergroup")) return [3 /*break*/, 4];
                if (!(submessage.shortcut.chat_id != ((_b = (_a = submessage.user) === null || _a === void 0 ? void 0 : _a.port_details) === null || _b === void 0 ? void 0 : _b.chat))) return [3 /*break*/, 4];
                _more_txt = "";
                if (((_c = submessage.user.port) !== null && _c !== void 0 ? _c : "").length !== 0) {
                    bought_on_jalali = timestampToJalali(submessage.user.port_details.bought);
                    _more_txt += "\n\n<blockquote>" + build("\uD83C\uDF00 port: ") + "<code>".concat(submessage.user.port, "</code>\n");
                    _more_txt += build("\uD83D\uDC65 users: ") + "<code>".concat(submessage.user.port_clients, "</code>\n");
                    _more_txt += build("\uD83D\uDCDD chat: ") + "<code>".concat(submessage.user.port_details.chat, "</code>\n");
                    _more_txt += build("\uD83D\uDCCA status: ") + "<code>".concat(submessage.user.port_details.expired === true ? "expired" : "activated", "</code>\n");
                    _more_txt += build("\u231A bought: ") + "<code>".concat(bought_on_jalali, "</code>\n");
                    _more_txt += build("\u231B you`ve got [ ") + Math.floor(msToDays(submessage.user.port_details.expires - Date.now())) + build(" ] days") + '</blockquote>';
                }
                return [4 /*yield*/, bot.telegram.sendMessage(submessage.shortcut.chat_id, build("\uD83D\uDD2E welcome to start panel") + "".concat(_more_txt, "\n\n") + build("\u2615 would u buy me a coffee ?\n") + "<code>".concat(botwallet, "</code>"), {
                        reply_parameters: {
                            message_id: submessage.shortcut.message_id
                        },
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: build("👛 buy"), callback_data: "buy_".concat(submessage.shortcut.from_id) }, { text: build("🔃 rebuy"), callback_data: "update_".concat(submessage.shortcut.from_id) }],
                                [{ text: build("🧶 buy mode"), callback_data: "buymode_".concat(submessage.shortcut.from_id) }],
                                [{ text: build("\uD83D\uDCF0 request all"), callback_data: "requestall_".concat(submessage.shortcut.from_id) }, { text: build("\u270F\uFE0F apk confs"), callback_data: "apkconfigs_".concat(submessage.shortcut.from_id) }]
                            ]
                        }
                    })];
            case 3: return [2 /*return*/, _d.sent()];
            case 4: return [2 /*return*/];
        }
    });
}); });
function build(string) {
    return string.split('').map(function (char) { return translationTable[char] || char; }).join('');
}
function timestampToJalali(timestamp) {
    var m = moment(timestamp);
    return m.format('jYYYY/jMM/jDD HH:mm:ss');
}
bot.launch();
// write Database/Client
// /start command must verify with Port.getPortByChat (if chat === supergroup or group) (if chat === private show buy/rebuy/buymode)
