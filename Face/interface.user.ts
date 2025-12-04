export interface User {
    id: number;
    coins: number;
    buymode: "auto" | "manual";
    port: string;
}
