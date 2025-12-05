import UserHandler from "./handler";
import { User } from "../../Face/interface.user";
import { Cache } from "../../Redis/caching";

class UserController {
    private async ensureConnected() {
        await UserHandler.connect();
    }

    async getAllUsers(): Promise<User[]> {
        await this.ensureConnected();
        const _users = await UserHandler.collection("users").find({ }).toArray();
        return _users as any as User[];
    }

    async getUserById(id: number): Promise<User | null> {
        await this.ensureConnected();
        const _ruser = await Cache.get(`user:${id}`);

        if (_ruser){
            return JSON.parse(_ruser as string) as User;
        } else {
            const users = await this.getAllUsers();
            const _user = users.find(user => user.id === id);
            if (_user){
                await Cache.set(`user:${id}`, JSON.stringify(_user));
            }
            return _user !== undefined ? _user : null;
        }
    }

    async chargeUser(id: number, amount: number): Promise<object> {
        await this.ensureConnected();
        const user = await this.getUserById(id);
        if (!user){
            return { status: false, message: "user not found" };
        }

        user.coins += amount;

        await UserHandler.collection("users").updateOne({ id }, { $set: { coins: user.coins } });
        await Cache.set(`user:${id}`, JSON.stringify(user));

        return { status: true };
    }

    async dechargeUser(id: number, amount: number): Promise<object> {
        await this.ensureConnected();
        const user = await this.getUserById(id);
        if (!user){
            return { status: false, message: "user not found" };
        }

        user.coins -= amount;

        await UserHandler.collection("users").updateOne({ id }, { $set: { coins: user.coins } });
        await Cache.set(`user:${id}`, JSON.stringify(user));

        return { status: true };
    }

    async changeBuyMode(id: number, mode: "auto" | "manual"): Promise<object> {
        const user = await this.getUserById(id);

        if (!user){
            return { status: false, message: "user not found" };
        }

        user.buymode = mode;

        await UserHandler.collection("users").updateOne({ id }, { $set: { buymode: mode } });
        await Cache.set(`user:${id}`, JSON.stringify(user));

        return { status: true, current_mode: mode };
    }

    async addUser(id: number): Promise<void> {
        await this.ensureConnected();
        const user = await this.getUserById(id);

        if (user){return;}

        await UserHandler.collection("users").insertOne({ id, coins: 0, buymode: "manual", port: "" });
        await Cache.set(`user:${id}`, JSON.stringify({ id, coins: 0, buymode: "manual", port: "" }));
    }
}

export default UserController;