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
exports.ClientController = void 0;
var handler_1 = require("./handler");
var caching_1 = require("../../Redis/caching");
var redis_1 = require("../../Redis/redis");
function scanClientKeys() {
    return __asyncGenerator(this, arguments, function scanClientKeys_1() {
        var cursor, _a, nextCursor, keys, _i, keys_1, key;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cursor = '0';
                    _b.label = 1;
                case 1: return [4 /*yield*/, __await(redis_1.redis.scan(cursor, 'MATCH', 'client:*', 'COUNT', 1000))];
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
var ClientController = /** @class */ (function () {
    function ClientController() {
    }
    ClientController.prototype.ensureConnected = function () {
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
    ClientController.prototype.getAllClients = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _clients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, handler_1.default.collection("clients").find({}).toArray()];
                    case 2:
                        _clients = _a.sent();
                        return [2 /*return*/, _clients];
                }
            });
        });
    };
    ClientController.prototype.getClientByAndroidId = function (android_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _rclient, _clients, _cli;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caching_1.Cache.get("client:".concat(android_id))];
                    case 1:
                        _rclient = _a.sent();
                        if (_rclient) {
                            return [2 /*return*/, JSON.parse(_rclient)];
                        }
                        return [4 /*yield*/, this.getAllClients()];
                    case 2:
                        _clients = _a.sent();
                        _cli = _clients.find(function (cli) { return cli.android_id === android_id; });
                        if (!_cli) return [3 /*break*/, 4];
                        return [4 /*yield*/, caching_1.Cache.set("client:".concat(android_id), JSON.stringify(_cli))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, _cli !== null && _cli !== void 0 ? _cli : null];
                }
            });
        });
    };
    ClientController.prototype.getClientsByPort = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var __fclients, _a, _b, _c, key, android_id, client, e_1_1, clients, clientsFromDB, _i, clientsFromDB_1, cl;
            var _d, e_1, _e, _f;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.ensureConnected()];
                    case 1:
                        _h.sent();
                        __fclients = new Set();
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 8, 9, 14]);
                        _a = true, _b = __asyncValues(scanClientKeys());
                        _h.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _h.sent(), _d = _c.done, !_d)) return [3 /*break*/, 7];
                        _f = _c.value;
                        _a = false;
                        key = _f;
                        android_id = key.replace('client:', '');
                        return [4 /*yield*/, this.getClientByAndroidId(android_id)];
                    case 5:
                        client = _h.sent();
                        if (client && client.port === port) {
                            __fclients.add(client);
                        }
                        _h.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _h.trys.push([9, , 12, 13]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _e.call(_b)];
                    case 10:
                        _h.sent();
                        _h.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [4 /*yield*/, handler_1.default.collection("clients").find({}).toArray()];
                    case 15:
                        clients = _h.sent();
                        clientsFromDB = (_g = clients.filter(function (p) { return p.port === port; })) !== null && _g !== void 0 ? _g : [];
                        _i = 0, clientsFromDB_1 = clientsFromDB;
                        _h.label = 16;
                    case 16:
                        if (!(_i < clientsFromDB_1.length)) return [3 /*break*/, 19];
                        cl = clientsFromDB_1[_i];
                        if (!!__fclients.has(cl)) return [3 /*break*/, 18];
                        return [4 /*yield*/, caching_1.Cache.set("client:".concat(cl.android_id), JSON.stringify(cl))];
                    case 17:
                        _h.sent();
                        __fclients.add(cl);
                        _h.label = 18;
                    case 18:
                        _i++;
                        return [3 /*break*/, 16];
                    case 19: return [2 /*return*/, Array.from(__fclients)];
                }
            });
        });
    };
    ClientController.prototype.addClient = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var real_client, fclient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        real_client = __assign(__assign({}, client), { mask: null });
                        return [4 /*yield*/, this.getClientByAndroidId(real_client.android_id)];
                    case 1:
                        fclient = _a.sent();
                        if (!(fclient === null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, caching_1.Cache.set("client:".concat(real_client.android_id), JSON.stringify(real_client))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, handler_1.default.collection("clients").insertOne(real_client)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { status: true, mode: "new" }];
                    case 4: return [2 /*return*/, { status: true, mode: "old" }];
                }
            });
        });
    };
    ClientController.prototype.renameClient = function (android_id, new_mask) {
        return __awaiter(this, void 0, void 0, function () {
            var fclient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClientByAndroidId(android_id)];
                    case 1:
                        fclient = _a.sent();
                        if (!(fclient === null)) return [3 /*break*/, 2];
                        return [2 /*return*/, { status: false, message: "invalid android id" }];
                    case 2:
                        fclient.mask = new_mask.length > 0 ? new_mask : null;
                        return [4 /*yield*/, caching_1.Cache.set("client:".concat(android_id), JSON.stringify(fclient))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, handler_1.default.collection("clients").insertOne(fclient)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { status: true }];
                }
            });
        });
    };
    return ClientController;
}());
exports.ClientController = ClientController;
