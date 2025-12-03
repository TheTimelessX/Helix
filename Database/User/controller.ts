import UserHandler from "./handler";
import { User } from "../../Face/interface.user";
import { Cache } from "../../Redis/caching";

class UserController {
    private async ensureConnected() {
        await UserHandler.connect();
    }

    async getAllUsers(callback: (users: User[]) => void){
        await this.ensureConnected();
        const _users = await UserHandler.collection("users").find({ }).toArray();
        return callback(_users as any as User[]);
    }

    async getUserById(id: number, callback: (user: User | null) => void){
        await this.ensureConnected();
        const _ruser = await Cache.get(`user:${id}`);

        if (_ruser){
            return callback(JSON.parse(_ruser as string) as User);
        } else {
            await this.getAllUsers(async (users) => {
                const _user = users.find(user => user.id === id);
                if (_user){
                    await Cache.set(`user:${id}`, JSON.stringify(_user));
                }
                return callback(_user !== undefined ? _user : null);
            })
        }
    }

    async chargeUser(id: number, amount: number, callback: (data: object) => void){
        await this.ensureConnected();
        await this.getUserById(id, async (user) => {
            if (!user){
                return callback({ status: false, message: "user not found" });
            }

            user.coins += amount;

            await UserHandler.collection("users").updateOne({ id }, { $set: { coins: user.coins } }).then(async () => {
                await Cache.set(`user:${id}`, JSON.stringify(user)).then(() => {
                    return callback({ status: true });
                }).catch((e) => {
                    return callback({ status: false, message: e });
                })
            }).catch((e) => {
                return callback({ status: false, message: e });
            })
        })
    }

    async dechargeUser(id: number, amount: number, callback: (data: object) => void){
        await this.ensureConnected();
        await this.getUserById(id, async (user) => {
            if (!user){
                return callback({ status: false, message: "user not found" });
            }

            user.coins -= amount;

            await UserHandler.collection("users").updateOne({ id }, { $set: { coins: user.coins } }).then(async () => {
                await Cache.set(`user:${id}`, JSON.stringify(user)).then(() => {
                    return callback({ status: true });
                }).catch((e) => {
                    return callback({ status: false, message: e });
                })
            }).catch((e) => {
                return callback({ status: false, message: e });
            })
        })
    }
}

export default UserController;