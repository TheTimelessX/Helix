import { io, Socket } from "socket.io-client";

const ENGINE_URL = "http://127.0.0.1:5001"; // or your VPS IP
const KEY = "c9f756f78c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655713379b72e02f13683adb798de55a4497c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655b5a1fe99bf2a410e2d29bdbc0c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655";

export const socket: Socket = io(ENGINE_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 10000,
});

socket.on("connect", () => {
    console.log("Connected to engine →", socket.id);
});

socket.on("connect_error", (err) => {
    console.error("Connection failed:", err.message);
});

socket.on("error", (data) => {
    console.error("Server rejected:", data);
});

// socket.on("ok", (data) => {
//     console.log("Success →", data);
// });

export function sendMessage(method: string, payload: Record<any, any> = {}, shortcut: Record<any, any> = {}) {
    socket.emit("subserverMessage", {
        method,
        key: KEY,
        ...payload,
        shortcut
    });
}
