import PortHandler from "./handler";
import TheUserHandler from "../User/controller";
import TheUserRaw from "../User/handler";
import { Port } from "../../Face/interface.port";
import { Cache } from "../../Redis/caching";
import { redis } from "../../Redis/redis";
import { randomBytes } from "crypto";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

export const theUserHandler = new TheUserHandler();
export const daysToMs = (d: number) => d * 86_400_000;

const pricePath = join(__dirname, "price.txt");
let price: number;

if (!existsSync(pricePath)){
    writeFileSync(pricePath, "15");
    price = 15;
} else {
    price = parseInt(readFileSync(pricePath).toString());
}

async function* scanPortKeys(): AsyncGenerator<string> {
  let cursor = '0';
  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', 'port:*', 'COUNT', 1000);
    cursor = nextCursor;
    for (const key of keys) {
      yield key;
    }
  } while (cursor !== '0');
}

export async function changePrice(newPrice: number): Promise<boolean> {
    writeFileSync(pricePath, newPrice.toString(), { flag: "w" });
    price = newPrice;
    return true;
}

export async function readPrice(): Promise<number> {
    if (!existsSync(pricePath)){
        writeFileSync(pricePath, "15");
        price = 15;
        return 15;
    } else {
        return price;
    }
}

export class PortController {
    private async ensureConnected() {
        await PortHandler.connect();
    }

    get factorstring(): string {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+";
        const bytes = randomBytes(7);
        let result = "";
        for (let i = 0; i < 7; i++) {
            result += chars[bytes[i] % chars.length];
        }
        return result;
    }

    async getAllPorts(): Promise<Port[]> {
        await this.ensureConnected();
        const _ports = await PortHandler.collection("ports").find({  }).toArray();
        return _ports as any as Port[];
    }

    async getPortByName(name: string): Promise<Port | null> {
        await this.ensureConnected();
        const _rport = await Cache.get(`port:${name}`);

        if (_rport){
            return JSON.parse(_rport as string) as Port;
        } else {
            const ports = await this.getAllPorts();
            const _port = ports.find(port => port.name === name);
            if (_port){
                await Cache.set(`port:${name}`, JSON.stringify(_port));
            }
            return _port !== undefined ? _port : null;
        }
    }

    async getPortByChat(chat: number): Promise<Port | null> {
        await this.ensureConnected();

        for await (const key of scanPortKeys()) {
            const portName = key.replace('port:', '');
            const port = await this.getPortByName(portName);

            if (port && port.chat === chat) {
                return port;
            }
        }

        const ports = await PortHandler.collection("ports").find({ }).toArray() as any as Port[];
        const portFromDB = ports.find(p => p.chat === chat);

        if (portFromDB) {
            await Cache.set(`port:${portFromDB.name}`, JSON.stringify(portFromDB));
        }

        return portFromDB ?? null;
    }

    async banPortByName(name: string): Promise<object> {
        await this.ensureConnected();
        const port = await this.getPortByName(name);
        if (!port){
            return { status: false, message: "invalid port" };
        }

        if (port.banned){
            return { status: true, message: "port has been banned" };
        }

        port.banned = true;

        await PortHandler.collection("ports").updateOne({ name }, { $set: { banned: true } });
        await Cache.set(`port:${name}`, JSON.stringify(port));
        return { status: true, message: "port banned" };
    }

    async banPortByChat(chat: number): Promise<object> {
        await this.ensureConnected();
        const port = await this.getPortByChat(chat);
        if (!port){
            return { status: false, message: "invalid port" };
        }

        if (port.banned){
            return { status: true, message: "port has been banned" };
        }

        port.banned = true;

        await PortHandler.collection("ports").updateOne({ chat }, { $set: { banned: true } });
        await Cache.set(`port:${port.name}`, JSON.stringify(port));
        return { status: true, message: "port banned" };
    }

    async unbanPortByName(name: string): Promise<object> {
        await this.ensureConnected();
        const port = await this.getPortByName(name);
        if (!port){
            return { status: false, message: "invalid port" };
        }

        if (port.banned){
            return { status: true, message: "port hasnt been banned" };
        }

        port.banned = false;

        await PortHandler.collection("ports").updateOne({ name }, { $set: { banned: false } });
        await Cache.set(`port:${name}`, JSON.stringify(port));
        return { status: true, message: "port unbanned" };
    }

    async unbanPortByChat(chat: number): Promise<object> {
        await this.ensureConnected();
        const port = await this.getPortByChat(chat);
        if (!port){
            return { status: false, message: "invalid port" };
        }

        if (port.banned){
            return { status: true, message: "port hasnt been banned" };
        }

        port.banned = false;

        await PortHandler.collection("ports").updateOne({ name }, { $set: { banned: false } });
        await Cache.set(`port:${port.name}`, JSON.stringify(port));
        return { status: true, message: "port unbanned" };
    }

    async addPort(
        owner: number,
        chat: number,
        expires: number
    ): Promise<object> {
        await this.ensureConnected();
        const user = await theUserHandler.getUserById(owner);

        if (!user){
            return { status: false, message: "user not found" };
        }

        if (user.port.length !== 0){
            return { status: false, message: "user has port" };
        }

        const portinfo: Port = {
            owner, chat, expires,
            name: this.factorstring,
            bought: Date.now(),
            banned: false,
            expired: false
        };

        await PortHandler.collection("ports").insertOne({ ...portinfo });
        await Cache.set(`port:${portinfo.name}`, JSON.stringify(portinfo));

        user.port = portinfo.name;

        await TheUserRaw.collection("users").updateOne({ id: user.id }, { $set: { port: portinfo.name } });
        await Cache.set(`user:${owner}`, JSON.stringify(user));

        return { status: true, port: portinfo };
    }

    async removePortByOwner(owner: number): Promise<object> { // only for admins
        await this.ensureConnected();
        const user = await theUserHandler.getUserById(owner);

        if (!user){
            return { status: false, message: "user not found" };
        }

        if (user.port.length === 0){
            return { status: false, message: "user has no port" };
        }

        await PortHandler.collection("ports").deleteOne({ owner });
        await Cache.del(`port:${owner}`);

        user.port = "";

        await TheUserRaw.collection("users").updateOne({ id: user.id }, { $set: { port: "" } });
        await Cache.set(`user:${owner}`, JSON.stringify(user));

        return { status: true };
    }

    async removePortByName(name: string): Promise<object> { // only for admins
        await this.ensureConnected();
        const port = await this.getPortByName(name);

        if (!port){
            return { status: false, message: "port not found" };
        }

        const puser = await theUserHandler.getUserById(port.owner)!;

        await PortHandler.collection("ports").deleteOne({ name });
        await Cache.del(`port:${name}`);

        puser!.port = "";

        await TheUserRaw.collection("users").updateOne({ id: puser!.id }, { $set: { port: "" } });
        await Cache.set(`user:${puser!.id}`, JSON.stringify(puser!));

        return { status: true };
    }

    async watch(): Promise<NodeJS.Timeout> {
        return setInterval(async () => {
            const allports = await this.getAllPorts();
            for (const port of allports){
                if (!port.expired){
                    if (port.expires < Date.now()){
                        const _owner = await theUserHandler.getUserById(port.owner);
                        if (!_owner){
                            port.expired = true;
                            await PortHandler.collection("ports").updateOne({ name: port.name }, { $set: { expired: true } });
                            await Cache.set(`port:${port.name}`, JSON.stringify(port));
                        } else if (_owner.buymode === "manual") {
                            port.expired = true;
                            await PortHandler.collection("ports").updateOne({ name: port.name }, { $set: { expired: true } });
                            await Cache.set(`port:${port.name}`, JSON.stringify(port));
                        } else if (_owner.buymode === "auto") {
                            if (_owner.coins >= price){
                                port.expires += daysToMs(7);
                                await theUserHandler.dechargeUser(port.owner, price);
                                await PortHandler.collection("ports").updateOne({ name: port.name }, { $set: { expires: port.expires } });
                                await Cache.set(`port:${port.name}`, JSON.stringify(port));
                            } else {
                                port.expired = true;
                                await PortHandler.collection("ports").updateOne({ name: port.name }, { $set: { expired: true } });
                                await Cache.set(`port:${port.name}`, JSON.stringify(port));
                            }
                        }
                    }
                }
            }
        }, 10000);
    }
}
