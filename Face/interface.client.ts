export interface Client {
    port: string;
    chat: number; // will known from dbs
    first_ip: string;
    model: string;
    android_version: string;
    installed_at: number;
    net: string; // money
    battery: number;
    mask: string;
}
