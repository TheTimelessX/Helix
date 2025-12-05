import ClientHandler from "./handler";
import { Client } from "../../Face/interface.client";
import { Cache } from "../../Redis/caching";
import { redis } from "../../Redis/redis";

async function* scanClientKeys(): AsyncGenerator<string> {
  let cursor = '0';
  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', 'client:*', 'COUNT', 1000);
    cursor = nextCursor;
    for (const key of keys) {
      yield key;
    }
  } while (cursor !== '0');
}

export class ClientController {
    private async ensureConnected() {
        await ClientHandler.connect();
    }

    async getAllClients(): Promise<Client[]> {
        await this.ensureConnected();
        const _clients = await ClientHandler.collection("clients").find({ }).toArray();
        return _clients as any as Client[];
    }

    async getClientByAndroidId(android_id: string): Promise<Client | null> {
        const _rclient = await Cache.get(`client:${android_id}`);
        if (_rclient){
            return JSON.parse(_rclient as string);
        }

        const _clients = await this.getAllClients();
        const _cli = _clients.find(cli => cli.android_id === android_id);
        if (_cli){
            await Cache.set(`client:${android_id}`, JSON.stringify(_cli));
        }
        return _cli ?? null;
    }

    async getClientsByPort(port: string): Promise<Client[]> {
        await this.ensureConnected();
        const __fclients = new Set<Client>();
        
        for await (const key of scanClientKeys()) {
            const android_id = key.replace('client:', '');
            const client = await this.getClientByAndroidId(android_id);

            if (client && client.port === port) {
                __fclients.add(client);
            }
        }

        const clients = await ClientHandler.collection("clients").find({ }).toArray() as any as Client[];
        const clientsFromDB = clients.filter(p => p.port === port) ?? [];

        for (const cl of clientsFromDB){
            if (!__fclients.has(cl)){
                await Cache.set(`client:${cl.android_id}`, JSON.stringify(cl));
                __fclients.add(cl);
            }
        }

        return Array.from(__fclients);
    }

    async addClient(client: Omit<Client, "mask">): Promise<object> {
        const real_client: Client = { ...client, mask: null };
        const fclient = await this.getClientByAndroidId(real_client.android_id);
        if (fclient === null){
            await Cache.set(`client:${real_client.android_id}`, JSON.stringify(real_client));
            await ClientHandler.collection("clients").insertOne(real_client);
            return { status: true, mode: "new" };
        } else {
            return { status: true, mode: "old" };
        }
    }
    
    async renameClient(android_id: string, new_mask: string): Promise<object> {
        const fclient = await this.getClientByAndroidId(android_id);
        if (fclient === null){
            return { status: false, message: "invalid android id" };
        } else {
            fclient.mask = new_mask.length > 0 ? new_mask : null;

            await Cache.set(`client:${android_id}`, JSON.stringify(fclient));
            await ClientHandler.collection("clients").insertOne(fclient);
            return { status: true };
        }
    }
}
