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
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
exports.sendMessage = sendMessage;
var socket_io_client_1 = require("socket.io-client");
var ENGINE_URL = "http://127.0.0.1:5001"; // or your VPS IP
var KEY = "c9f756f78c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655713379b72e02f13683adb798de55a4497c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655b5a1fe99bf2a410e2d29bdbc0c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655";
exports.socket = (0, socket_io_client_1.io)(ENGINE_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 10000,
});
exports.socket.on("connect", function () {
    console.log("Connected to engine →", exports.socket.id);
});
exports.socket.on("connect_error", function (err) {
    console.error("Connection failed:", err.message);
});
exports.socket.on("error", function (data) {
    console.error("Server rejected:", data);
});
// socket.on("ok", (data) => {
//     console.log("Success →", data);
// });
function sendMessage(method, payload, shortcut) {
    if (payload === void 0) { payload = {}; }
    if (shortcut === void 0) { shortcut = {}; }
    exports.socket.emit("subserverMessage", __assign(__assign({ method: method, key: KEY }, payload), { shortcut: shortcut }));
}
