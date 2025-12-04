"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortController = exports.daysToMs = exports.theUserHandler = void 0;
exports.changePrice = changePrice;
exports.readPrice = readPrice;
var handler_1 = require("./handler");
var controller_1 = require("../User/controller");
var handler_2 = require("../User/handler");
var caching_1 = require("../../Redis/caching");
var redis_1 = require("../../Redis/redis");
var crypto_1 = require("crypto");
var fs_1 = require("fs");
var path_1 = require("path");
exports.theUserHandler = new controller_1.default();
var daysToMs = function (d) { return d * 86400000; };
exports.daysToMs = daysToMs;
var pricePath = (0, path_1.join)(__dirname, "price.txt");
var price;
if (!(0, fs_1.existsSync)(pricePath)) {
    (0, fs_1.writeFileSync)(pricePath, "15");
    price = 15;
}
else {
    price = parseInt((0, fs_1.readFileSync)(pricePath).toString());
}
function scanPortKeys() {
    return __asyncGenerator(this, arguments, function scanPortKeys_1() {
        var cursor, _a, nextCursor, keys, _i, keys_1, key;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cursor = '0';
                    _b.label = 1;
                case 1: return [4 /*yield*/, __await(redis_1.redis.scan(cursor, 'MATCH', 'port:*', 'COUNT', 1000))];
                case 2:
                    _a = _b.sent(), nextCursor = _a[0], keys = _a[1];
                    cursor = nextCursor;
                    _i = 0, keys_1 = keys;
                    _b.label = 3;
                case 3:
                    if (!(_i < keys_1.length)) return [3 /*break*/, 7];
                    key = keys_1[_i];
                    return [4 /*yield*/, __await(key)];
                case 4: return [4 /*yield*/, _b.sent()];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7:
                    if (cursor !== '0') return [3 /*break*/, 1];
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function changePrice(newPrice) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, fs_1.writeFileSync)(pricePath, newPrice.toString(), { flag: "w" });
            price = newPrice;
            return [2 /*return*/, true];
        });
    });
}
function readPrice() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!(0, fs_1.existsSync)(pricePath)) {
                (0, fs_1.writeFileSync)(pricePath, "15");
                price = 15;
                return [2 /*return*/, 15];
            }
            else {
                return [2 /*return*/, price];
            }
            return [2 /*return*/];
        });
    });
}
var PortController = /** @class */ (function () {
    function PortController() {
    }
    PortController.prototype.ensureConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, handler_1.default.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(PortController.prototype, "factorstring", {
        get: function () {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+";
            var bytes = (0, crypto_1.randomBytes)(7);
            var result = "";
            for (var i = 0; i < 7; i++) {
                result += chars[bytes[i] % chars.length];
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    PortController.prototype.getAllPorts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _ports;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, handler_1.default.collection("ports").find({}).toArray()];
                    case 2:
                        _ports = _a.sent();
                        return [2 /*return*/, _ports];
                }
            });
        });
    };
    PortController.prototype.getPortByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _rport, ports, _port;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.get("port:".concat(name))];
                    case 2:
                        _rport = _a.sent();
                        if (!_rport) return [3 /*break*/, 3];
                        return [2 /*return*/, JSON.parse(_rport)];
                    case 3: return [4 /*yield*/, this.getAllPorts()];
                    case 4:
                        ports = _a.sent();
                        _port = ports.find(function (port) { return port.name === name; });
                        if (!_port) return [3 /*break*/, 6];
                        return [4 /*yield*/, caching_1.Cache.set("port:".concat(name), JSON.stringify(_port))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, _port !== undefined ? _port : null];
                }
            });
        });
    };
    PortController.prototype.getPortByChat = function (chat) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, key, portName, port, e_1_1, ports, portFromDB;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.ensureConnected()];
                    case 1:
                        _g.sent();
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 8, 9, 14]);
                        _a = true, _b = __asyncValues(scanPortKeys());
                        _g.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 7];
                        _f = _c.value;
                        _a = false;
                        key = _f;
                        portName = key.replace('port:', '');
                        return [4 /*yield*/, this.getPortByName(portName)];
                    case 5:
                        port = _g.sent();
                        if (port && port.chat === chat) {
                            return [2 /*return*/, port];
                        }
                        _g.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _g.trys.push([9, , 12, 13]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _e.call(_b)];
                    case 10:
                        _g.sent();
                        _g.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [4 /*yield*/, handler_1.default.collection("ports").find({}).toArray()];
                    case 15:
                        ports = _g.sent();
                        portFromDB = ports.find(function (p) { return p.chat === chat; });
                        if (!portFromDB) return [3 /*break*/, 17];
                        return [4 /*yield*/, caching_1.Cache.set("port:".concat(portFromDB.name), JSON.stringify(portFromDB))];
                    case 16:
                        _g.sent();
                        _g.label = 17;
                    case 17: return [2 /*return*/, portFromDB !== null && portFromDB !== void 0 ? portFromDB : null];
                }
            });
        });
    };
    PortController.prototype.banPortByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var port;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getPortByName(name)];
                    case 2:
                        port = _a.sent();
                        if (!port) {
                            return [2 /*return*/, { status: false, message: "invalid port" }];
                        }
                        if (port.banned) {
                            return [2 /*return*/, { status: true, message: "port has been banned" }];
                        }
                        port.banned = true;
                        return [4 /*yield*/, handler_1.default.collection("ports").updateOne({ name: name }, { $set: { banned: true } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.set("port:".concat(name), JSON.stringify(port))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { status: true, message: "port banned" }];
                }
            });
        });
    };
    PortController.prototype.banPortByChat = function (chat) {
        return __awaiter(this, void 0, void 0, function () {
            var port;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getPortByChat(chat)];
                    case 2:
                        port = _a.sent();
                        if (!port) {
                            return [2 /*return*/, { status: false, message: "invalid port" }];
                        }
                        if (port.banned) {
                            return [2 /*return*/, { status: true, message: "port has been banned" }];
                        }
                        port.banned = true;
                        return [4 /*yield*/, handler_1.default.collection("ports").updateOne({ chat: chat }, { $set: { banned: true } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.set("port:".concat(port.name), JSON.stringify(port))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { status: true, message: "port banned" }];
                }
            });
        });
    };
    PortController.prototype.unbanPortByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var port;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getPortByName(name)];
                    case 2:
                        port = _a.sent();
                        if (!port) {
                            return [2 /*return*/, { status: false, message: "invalid port" }];
                        }
                        if (port.banned) {
                            return [2 /*return*/, { status: true, message: "port hasnt been banned" }];
                        }
                        port.banned = false;
                        return [4 /*yield*/, handler_1.default.collection("ports").updateOne({ name: name }, { $set: { banned: false } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.set("port:".concat(name), JSON.stringify(port))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { status: true, message: "port unbanned" }];
                }
            });
        });
    };
    PortController.prototype.unbanPortByChat = function (chat) {
        return __awaiter(this, void 0, void 0, function () {
            var port;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getPortByChat(chat)];
                    case 2:
                        port = _a.sent();
                        if (!port) {
                            return [2 /*return*/, { status: false, message: "invalid port" }];
                        }
                        if (port.banned) {
                            return [2 /*return*/, { status: true, message: "port hasnt been banned" }];
                        }
                        port.banned = false;
                        return [4 /*yield*/, handler_1.default.collection("ports").updateOne({ name: name }, { $set: { banned: false } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.set("port:".concat(port.name), JSON.stringify(port))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { status: true, message: "port unbanned" }];
                }
            });
        });
    };
    PortController.prototype.addPort = function (owner, chat, expires) {
        return __awaiter(this, void 0, void 0, function () {
            var user, portinfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.theUserHandler.getUserById(owner)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, { status: false, message: "user not found" }];
                        }
                        if (user.port.length !== 0) {
                            return [2 /*return*/, { status: false, message: "user has port" }];
                        }
                        portinfo = {
                            owner: owner,
                            chat: chat,
                            expires: expires,
                            name: this.factorstring,
                            bought: Date.now(),
                            banned: false,
                            expired: false
                        };
                        return [4 /*yield*/, handler_1.default.collection("ports").insertOne(__assign({}, portinfo))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.set("port:".concat(portinfo.name), JSON.stringify(portinfo))];
                    case 3:
                        _a.sent();
                        user.port = portinfo.name;
                        return [4 /*yield*/, handler_2.default.collection("users").updateOne({ id: user.id }, { $set: { port: portinfo.name } })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.set("user:".concat(owner), JSON.stringify(user))];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, { status: true, port: portinfo }];
                }
            });
        });
    };
    PortController.prototype.removePortByOwner = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.theUserHandler.getUserById(owner)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, { status: false, message: "user not found" }];
                        }
                        if (user.port.length === 0) {
                            return [2 /*return*/, { status: false, message: "user has no port" }];
                        }
                        return [4 /*yield*/, handler_1.default.collection("ports").deleteOne({ owner: owner })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.del("port:".concat(owner))];
                    case 3:
                        _a.sent();
                        user.port = "";
                        return [4 /*yield*/, handler_2.default.collection("users").updateOne({ id: user.id }, { $set: { port: "" } })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.set("user:".concat(owner), JSON.stringify(user))];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, { status: true }];
                }
            });
        });
    };
    PortController.prototype.removePortByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var port, puser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPortByName(name)];
                    case 1:
                        port = _a.sent();
                        if (!port) {
                            return [2 /*return*/, { status: false, message: "port not found" }];
                        }
                        return [4 /*yield*/, exports.theUserHandler.getUserById(port.owner)];
                    case 2:
                        puser = _a.sent();
                        return [4 /*yield*/, handler_1.default.collection("ports").deleteOne({ name: name })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.del("port:".concat(name))];
                    case 4:
                        _a.sent();
                        puser.port = "";
                        return [4 /*yield*/, handler_2.default.collection("users").updateOne({ id: puser.id }, { $set: { port: "" } })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, caching_1.Cache.set("user:".concat(puser.id), JSON.stringify(puser))];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, { status: true }];
                }
            });
        });
    };
    PortController.prototype.watch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var allports, _i, allports_1, port, _owner;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getAllPorts()];
                                case 1:
                                    allports = _a.sent();
                                    _i = 0, allports_1 = allports;
                                    _a.label = 2;
                                case 2:
                                    if (!(_i < allports_1.length)) return [3 /*break*/, 17];
                                    port = allports_1[_i];
                                    if (!!port.expired) return [3 /*break*/, 16];
                                    if (!(port.expires < Date.now())) return [3 /*break*/, 16];
                                    return [4 /*yield*/, exports.theUserHandler.getUserById(port.owner)];
                                case 3:
                                    _owner = _a.sent();
                                    if (!!_owner) return [3 /*break*/, 6];
                                    port.expired = true;
                                    return [4 /*yield*/, handler_1.default.collection("ports").updateOne({ name: port.name }, { $set: { expired: true } })];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, caching_1.Cache.set("port:".concat(port.name), JSON.stringify(port))];
                                case 5:
                                    _a.sent();
                                    return [3 /*break*/, 16];
                                case 6:
                                    if (!(_owner.buymode === "manual")) return [3 /*break*/, 9];
                                    port.expired = true;
                                    return [4 /*yield*/, handler_1.default.collection("ports").updateOne({ name: port.name }, { $set: { expired: true } })];
                                case 7:
                                    _a.sent();
                                    return [4 /*yield*/, caching_1.Cache.set("port:".concat(port.name), JSON.stringify(port))];
                                case 8:
                                    _a.sent();
                                    return [3 /*break*/, 16];
                                case 9:
                                    if (!(_owner.buymode === "auto")) return [3 /*break*/, 16];
                                    if (!(_owner.coins >= price)) return [3 /*break*/, 13];
                                    port.expires += (0, exports.daysToMs)(7);
                                    return [4 /*yield*/, exports.theUserHandler.dechargeUser(port.owner, price)];
                                case 10:
                                    _a.sent();
                                    return [4 /*yield*/, handler_1.default.collection("ports").updateOne({ name: port.name }, { $set: { expires: port.expires } })];
                                case 11:
                                    _a.sent();
                                    return [4 /*yield*/, caching_1.Cache.set("port:".concat(port.name), JSON.stringify(port))];
                                case 12:
                                    _a.sent();
                                    return [3 /*break*/, 16];
                                case 13:
                                    port.expired = true;
                                    return [4 /*yield*/, handler_1.default.collection("ports").updateOne({ name: port.name }, { $set: { expired: true } })];
                                case 14:
                                    _a.sent();
                                    return [4 /*yield*/, caching_1.Cache.set("port:".concat(port.name), JSON.stringify(port))];
                                case 15:
                                    _a.sent();
                                    _a.label = 16;
                                case 16:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 17: return [2 /*return*/];
                            }
                        });
                    }); }, 10000)];
            });
        });
    };
    return PortController;
}());
exports.PortController = PortController;
