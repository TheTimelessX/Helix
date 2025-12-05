import * as expre from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PortController, theUserHandler, readPrice, changePrice } from "../Port/controller";
import { ClientController } from "../Client/controller";

const theKey = "c9f756f78c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655713379b72e02f13683adb798de55a4497c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655b5a1fe99bf2a410e2d29bdbc0c9f756f78713379b72e02f13683adb798de55a4497b5a1fe99bf2a410e2d29bdbc0c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655c8d51125b38a623655b693884a4610ed68dfac04793d244b37294b2d66655";

const portController = new PortController();
const clientController = new ClientController();
const app = (expre.default || expre)();
const httpServer = createServer(app);
const sio = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:7052", "http://127.0.0.1:7052", "http://0.0.0.0:7052"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

process.on("uncaughtException", async (uexcept) => {
    console.error(uexcept);
})

process.on("uncaughtExceptionMonitor", async (uexceptmonitor) => {
    console.error(uexceptmonitor);
})

process.on("unhandledRejection", async (unhandle) => {
    console.error(unhandle);
})

interface DataFromSubServer {
    method: string;
    key: string;
    [k: string]: string | number | object;
}

sio.on("connection", async (socket) => {
    socket.on("subserverMessage", async (data: DataFromSubServer) => {
        console.log(data);
        if (data.key !== theKey){
            socket.emit("error", {
                shortcut: data.shortcut ?? {},
                message: "input error"
            });
        }

        if (data.method === "addUser"){
            await theUserHandler.addUser(data.id as number);
            socket.emit("ok", {
                method: "addUser",
                message: "user added",
                shortcut: data.shortcut ?? {},
            })
        } else if (data.method === "getUserById"){
            // let _res = await theUserHandler.getUserById(data.id as number);
            // if (_res){
            //     if (_res.port.length !== 0){
            //         const clsport = await clientController.getClientsByPort(_res.port);
            //         const chport  = await portController.getPortByName(_res.port);
            //         (_res as any).port_clients = clsport.length;
            //         (_res as any).port_details = chport;
            //     }
            // }
            // let _res = { status: true, user: {
            //     port: "tyPx4+z",
            //     port_clients: 328,
            //     port_details: {
            //         chat: -4444,
            //         expired: false,
            //         bought: Date.now() - 10000000,
            //         expires: Date.now() + 1000000000,

            //     }
            // } }
            let _res = { status: true, user: {} }
            socket.emit("ok", {
                method: "getUserById",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "chargeUser"){
            await theUserHandler.chargeUser(data.id as number, data.amount as number);
            socket.emit("ok", {
                method: "chargeUser",
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "dechargeUser"){
            await theUserHandler.dechargeUser(data.id as number, data.amount as number);
            socket.emit("ok", {
                method: "chargeUser",
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "changeBuyMode"){
            await theUserHandler.changeBuyMode(data.id as number, data.mode as "auto" | "manual");
            socket.emit("ok", {
                method: "changeBuyMode",
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "getPortByName"){
            const _res = await portController.getPortByName(data.name as string);
            socket.emit("ok", {
                method: "getPortByName",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "getPortByChat"){
            const _res = await portController.getPortByChat(data.name as number);
            socket.emit("ok", {
                method: "getPortByChat",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "banPortByName"){
            const _res = await portController.banPortByName(data.name as string);
            socket.emit("ok", {
                method: "banPortByName",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "unbanPortByName"){
            const _res = await portController.unbanPortByName(data.name as string);
            socket.emit("ok", {
                method: "unbanPortByName",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "banPortByChat"){
            const _res = await portController.banPortByChat(data.chat as number);
            socket.emit("ok", {
                method: "banPortByChat",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "unbanPortByChat"){
            const _res = await portController.unbanPortByChat(data.chat as number);
            socket.emit("ok", {
                method: "unbanPortByChat",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "addPort"){
            const _res = await portController.addPort(
                data.owner as number,
                data.chat as number,
                data.expires as number
            );
            socket.emit("ok", {
                method: "addPort",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "removePortByName"){
            const _res = await portController.removePortByName(data.name as string);
            socket.emit("ok", {
                method: "removePortByName",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "removePortByOwner"){
            const _res = await portController.removePortByOwner(data.chat as number);
            socket.emit("ok", {
                method: "removePortByOwner",
                ..._res,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "readPrice"){
            const _price = await readPrice();
            socket.emit("ok", {
                method: "readPrice",
                price: _price,
                shortcut: data.shortcut ?? {}
            })
        } else if (data.method === "changePrice"){
            const _price = await changePrice(data.newPrice as number);
            socket.emit("ok", {
                method: "changePrice",
                price: _price,
                shortcut: data.shortcut ?? {}
            })
        } else {
            socket.emit("error", {
                message: "input error",
                shortcut: data.shortcut ?? {}
            });
        }
    })
});

httpServer.listen(5001, "0.0.0.0", async () => {
    console.log("[+] server runned on 5001");
    console.log("[/] running watcher ...");
    await portController.watch();
    console.log("[+] watcher activated");
});
