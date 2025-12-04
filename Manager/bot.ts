const TOKEN = "7669848828:AAFtHTSAJU3RsKM5fYfBDBpO67lGzDO_CEw";
const botwallet = "TCymMoexTgT2J6UMLq7rScRdj3BjhTM6kL";

import * as telegram from "node-telegram-bot-api";
import { sendMessage, socket } from "./engine";
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(TOKEN, { polling: true }) as telegram;
const translationTable = {
    'q': 'ǫ', 'w': 'ᴡ', 'e': 'ᴇ', 'r': 'ʀ', 't': 'ᴛ',
    'y': 'ʏ', 'u': 'ᴜ', 'i': 'ɪ', 'o': 'ᴏ', 'p': 'ᴘ',
    'a': 'ᴀ', 's': 's', 'd': 'ᴅ', 'f': 'ғ', 'g': 'ɢ',
    'h': 'ʜ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'z': 'ᴢ',
    'x': 'x', 'c': 'ᴄ', 'v': 'ᴠ', 'b': 'ʙ', 'n': 'ɴ',
    'm': 'ᴍ'
};

process.on("uncaughtException", async (uexcept) => {
    console.error(uexcept);
})

process.on("uncaughtExceptionMonitor", async (uexceptmonitor) => {
    console.error(uexceptmonitor);
})

process.on("unhandledRejection", async (unhandle) => {
    console.error(unhandle);
})

bot.on("message", async (message) => {
    if (!message.from){return;}
    if (message.chat.type === "channel"){return;}
    
    if (message.text){
        if (message.text.startsWith("/start")){
            sendMessage(
                "getUserById",
                {
                    id: message.from.id
                },
                {
                    message_id: message.message_id,
                    chat_id: message.chat.id,
                    from_id: message.from.id,
                    step: "verifyFromStart"
                }
            )
        }
    }
});

socket.on("ok", async (submessage) => {
    if (submessage.method === "getUserById"){
        if (submessage.step === "verifyFromStart"){
            return await bot.sendMessage(
                submessage.shortcut.chat_id,
                build("🔮 welcome to start panel\n\n☕ would u buy me a coffee ?\n") + `<code>${botwallet}</code>`,
                {
                    reply_to_message_id: submessage.shortcut.message_id,
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "🪙 buy", callback_data: `buy_${submessage.shortcut.from_id}` }, { text: "🔃 update", callback_data: `update_${submessage.shortcut.from_id}` }],
                            [{ text: "🧶 buy mode", callback_data: `buymode_${submessage.shortcut.from_id}` }]
                        ]
                    }
                }
            )
        }
    }
});

function build(string: string) {
    return string.split('').map(char => translationTable[char] || char).join('');
}
