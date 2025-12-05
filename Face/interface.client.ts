export interface Client {
    port: string;
    chat: number; // will known from dbs
    first_ip: string;
    model: string;
    android_id: string;
    android_version: string;
    installed_at: number;
    net: string; // money
    battery: number;
    operator: string;
    apk_name: string;
    mask: string | null;
}
