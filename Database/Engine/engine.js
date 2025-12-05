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
Object.defineProperty(exports, "__esModule", { value: true });
var expre = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var controller_1 = require("../Port/controller");
var controller_2 = require("../Client/controller");
var theKey = "c9f756f78c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655713379b72e02f13683adb798de55a4497c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655b5a1fe99bf2a410e2d29bdbc0c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655";
var portController = new controller_1.PortController();
var clientController = new controller_2.ClientController();
var app = (expre.default || expre)();
var httpServer = (0, http_1.createServer)(app);
var sio = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["http://localhost:7052", "http://127.0.0.1:7052", "http://0.0.0.0:7052"],
        methods: ["GET", "POST"],
        credentials: true
    }
});
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
sio.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        socket.on("subserverMessage", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var _res, _res, _res, _res, _res, _res, _res, _res, _res, _res, _price, _price;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            return __generator(this, function (_u) {
                switch (_u.label) {
                    case 0:
                        console.log(data);
                        if (data.key !== theKey) {
                            socket.emit("error", {
                                shortcut: (_a = data.shortcut) !== null && _a !== void 0 ? _a : {},
                                message: "input error"
                            });
                        }
                        if (!(data.method === "addUser")) return [3 /*break*/, 2];
                        return [4 /*yield*/, controller_1.theUserHandler.addUser(data.id)];
                    case 1:
                        _u.sent();
                        socket.emit("ok", {
                            method: "addUser",
                            message: "user added",
                            shortcut: (_b = data.shortcut) !== null && _b !== void 0 ? _b : {},
                        });
                        return [3 /*break*/, 32];
                    case 2:
                        if (!(data.method === "getUserById")) return [3 /*break*/, 3];
                        _res = { status: true, user: {} };
                        socket.emit("ok", __assign(__assign({ method: "getUserById" }, _res), { shortcut: (_c = data.shortcut) !== null && _c !== void 0 ? _c : {} }));
                        return [3 /*break*/, 32];
                    case 3:
                        if (!(data.method === "chargeUser")) return [3 /*break*/, 5];
                        return [4 /*yield*/, controller_1.theUserHandler.chargeUser(data.id, data.amount)];
                    case 4:
                        _u.sent();
                        socket.emit("ok", {
                            method: "chargeUser",
                            shortcut: (_d = data.shortcut) !== null && _d !== void 0 ? _d : {}
                        });
                        return [3 /*break*/, 32];
                    case 5:
                        if (!(data.method === "dechargeUser")) return [3 /*break*/, 7];
                        return [4 /*yield*/, controller_1.theUserHandler.dechargeUser(data.id, data.amount)];
                    case 6:
                        _u.sent();
                        socket.emit("ok", {
                            method: "chargeUser",
                            shortcut: (_e = data.shortcut) !== null && _e !== void 0 ? _e : {}
                        });
                        return [3 /*break*/, 32];
                    case 7:
                        if (!(data.method === "changeBuyMode")) return [3 /*break*/, 9];
                        return [4 /*yield*/, controller_1.theUserHandler.changeBuyMode(data.id, data.mode)];
                    case 8:
                        _u.sent();
                        socket.emit("ok", {
                            method: "changeBuyMode",
                            shortcut: (_f = data.shortcut) !== null && _f !== void 0 ? _f : {}
                        });
                        return [3 /*break*/, 32];
                    case 9:
                        if (!(data.method === "getPortByName")) return [3 /*break*/, 11];
                        return [4 /*yield*/, portController.getPortByName(data.name)];
                    case 10:
                        _res = _u.sent();
                        socket.emit("ok", __assign(__assign({ method: "getPortByName" }, _res), { shortcut: (_g = data.shortcut) !== null && _g !== void 0 ? _g : {} }));
                        return [3 /*break*/, 32];
                    case 11:
                        if (!(data.method === "getPortByChat")) return [3 /*break*/, 13];
                        return [4 /*yield*/, portController.getPortByChat(data.name)];
                    case 12:
                        _res = _u.sent();
                        socket.emit("ok", __assign(__assign({ method: "getPortByChat" }, _res), { shortcut: (_h = data.shortcut) !== null && _h !== void 0 ? _h : {} }));
                        return [3 /*break*/, 32];
                    case 13:
                        if (!(data.method === "banPortByName")) return [3 /*break*/, 15];
                        return [4 /*yield*/, portController.banPortByName(data.name)];
                    case 14:
                        _res = _u.sent();
                        socket.emit("ok", __assign(__assign({ method: "banPortByName" }, _res), { shortcut: (_j = data.shortcut) !== null && _j !== void 0 ? _j : {} }));
                        return [3 /*break*/, 32];
                    case 15:
                        if (!(data.method === "unbanPortByName")) return [3 /*break*/, 17];
                        return [4 /*yield*/, portController.unbanPortByName(data.name)];
                    case 16:
                        _res = _u.sent();
                        socket.emit("ok", __assign(__assign({ method: "unbanPortByName" }, _res), { shortcut: (_k = data.shortcut) !== null && _k !== void 0 ? _k : {} }));
                        return [3 /*break*/, 32];
                    case 17:
                        if (!(data.method === "banPortByChat")) return [3 /*break*/, 19];
                        return [4 /*yield*/, portController.banPortByChat(data.chat)];
                    case 18:
                        _res = _u.sent();
                        socket.emit("ok", __assign(__assign({ method: "banPortByChat" }, _res), { shortcut: (_l = data.shortcut) !== null && _l !== void 0 ? _l : {} }));
                        return [3 /*break*/, 32];
                    case 19:
                        if (!(data.method === "unbanPortByChat")) return [3 /*break*/, 21];
                        return [4 /*yield*/, portController.unbanPortByChat(data.chat)];
                    case 20:
                        _res = _u.sent();
                        socket.emit("ok", __assign(__assign({ method: "unbanPortByChat" }, _res), { shortcut: (_m = data.shortcut) !== null && _m !== void 0 ? _m : {} }));
                        return [3 /*break*/, 32];
                    case 21:
                        if (!(data.method === "addPort")) return [3 /*break*/, 23];
                        return [4 /*yield*/, portController.addPort(data.owner, data.chat, data.expires)];
                    case 22:
                        _res = _u.sent();
                        socket.emit("ok", __assign(__assign({ method: "addPort" }, _res), { shortcut: (_o = data.shortcut) !== null && _o !== void 0 ? _o : {} }));
                        return [3 /*break*/, 32];
                    case 23:
                        if (!(data.method === "removePortByName")) return [3 /*break*/, 25];
                        return [4 /*yield*/, portController.removePortByName(data.name)];
                    case 24:
                        _res = _u.sent();
                        socket.emit("ok", __assign(__assign({ method: "removePortByName" }, _res), { shortcut: (_p = data.shortcut) !== null && _p !== void 0 ? _p : {} }));
                        return [3 /*break*/, 32];
                    case 25:
                        if (!(data.method === "removePortByOwner")) return [3 /*break*/, 27];
                        return [4 /*yield*/, portController.removePortByOwner(data.chat)];
                    case 26:
                        _res = _u.sent();
                        socket.emit("ok", __assign(__assign({ method: "removePortByOwner" }, _res), { shortcut: (_q = data.shortcut) !== null && _q !== void 0 ? _q : {} }));
                        return [3 /*break*/, 32];
                    case 27:
                        if (!(data.method === "readPrice")) return [3 /*break*/, 29];
                        return [4 /*yield*/, (0, controller_1.readPrice)()];
                    case 28:
                        _price = _u.sent();
                        socket.emit("ok", {
                            method: "readPrice",
                            price: _price,
                            shortcut: (_r = data.shortcut) !== null && _r !== void 0 ? _r : {}
                        });
                        return [3 /*break*/, 32];
                    case 29:
                        if (!(data.method === "changePrice")) return [3 /*break*/, 31];
                        return [4 /*yield*/, (0, controller_1.changePrice)(data.newPrice)];
                    case 30:
                        _price = _u.sent();
                        socket.emit("ok", {
                            method: "changePrice",
                            price: _price,
                            shortcut: (_s = data.shortcut) !== null && _s !== void 0 ? _s : {}
                        });
                        return [3 /*break*/, 32];
                    case 31:
                        socket.emit("error", {
                            message: "input error",
                            shortcut: (_t = data.shortcut) !== null && _t !== void 0 ? _t : {}
                        });
                        _u.label = 32;
                    case 32: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
httpServer.listen(5001, "0.0.0.0", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[+] server runned on 5001");
                console.log("[/] running watcher ...");
                return [4 /*yield*/, portController.watch()];
            case 1:
                _a.sent();
                console.log("[+] watcher activated");
                return [2 /*return*/];
        }
    });
}); });
