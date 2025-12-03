import PortHandler from "./handler";
import { Port } from "../../Face/interface.port";
import { Cache } from "../../Redis/caching";
import { redis } from "../../Redis/redis";

async function* scanPortKeys(): AsyncGenerator<string> {
  let cursor = '0';
  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', 'port:*', 'COUNT', 100);
    cursor = nextCursor;
    for (const key of keys) {
      yield key;
    }
  } while (cursor !== '0');
}

class PortController {
    private async ensureConnected() {
        await PortHandler.connect();
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

    async banPortByName(name: string, callback: (data: object) => void){
        await this.ensureConnected();
        const port = await this.getPortByName(name);
        if (!port){
            return callback({ status: false, message: "invalid port" });
        }

        if (port.banned){
            return callback({ status: true, message: "port has been banned" });
        }

        port.banned = true;

        await PortHandler.collection("ports").updateOne({ name }, { $set: { banned: true } }).then(async () => {
            await Cache.set(`port:${name}`, JSON.stringify(port)).then(() => {
                return callback({ status: true, message: "port banned" });
            }).catch((e) => {
                return callback({ status: false, message: e });
            })
        }).catch((e) => {
            return callback({ status: false, message: e });
        })
    }

    async banPortByChat(chat: number, callback: (data: object) => void){
        await this.ensureConnected();
        const port = await this.getPortByChat(chat);
        if (!port){
            return callback({ status: false, message: "invalid port" });
        }

        if (port.banned){
            return callback({ status: true, message: "port has been banned" });
        }

        port.banned = true;

        await PortHandler.collection("ports").updateOne({ chat }, { $set: { banned: true } }).then(async () => {
            await Cache.set(`port:${port.name}`, JSON.stringify(port)).then(() => {
                return callback({ status: true, message: "port banned" });
            }).catch((e) => {
                return callback({ status: false, message: e });
            })
        }).catch((e) => {
            return callback({ status: false, message: e });
        })
    }

    async unbanPortByName(name: string, callback: (data: object) => void){
        await this.ensureConnected();
        const port = await this.getPortByName(name);
        if (!port){
            return callback({ status: false, message: "invalid port" });
        }

        if (port.banned){
            return callback({ status: true, message: "port hasnt been banned" });
        }

        port.banned = false;

        await PortHandler.collection("ports").updateOne({ name }, { $set: { banned: false } }).then(async () => {
            await Cache.set(`port:${name}`, JSON.stringify(port)).then(() => {
                return callback({ status: true, message: "port unbanned" });
            }).catch((e) => {
                return callback({ status: false, message: e });
            })
        }).catch((e) => {
            return callback({ status: false, message: e });
        })
    }

    async unbanPortByChat(chat: number, callback: (data: object) => void){
        await this.ensureConnected();
        const port = await this.getPortByChat(chat);
        if (!port){
            return callback({ status: false, message: "invalid port" });
        }

        if (port.banned){
            return callback({ status: true, message: "port hasnt been banned" });
        }

        port.banned = false;

        await PortHandler.collection("ports").updateOne({ name }, { $set: { banned: false } }).then(async () => {
            await Cache.set(`port:${port.name}`, JSON.stringify(port)).then(() => {
                return callback({ status: true, message: "port unbanned" });
            }).catch((e) => {
                return callback({ status: false, message: e });
            })
        }).catch((e) => {
            return callback({ status: false, message: e });
        })
    }
}

export default PortController;