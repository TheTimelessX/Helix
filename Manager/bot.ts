const TOKEN = "7669848828:AAFtHTSAJU3RsKM5fYfBDBpO67lGzDO_CEw";
const botwallet = "TCymMoexTgT2J6UMLq7rScRdj3BjhTM6kL";

import { Telegraf } from "telegraf";
import { sendMessage, socket } from "./engine";
import * as moment from 'moment-jalaali';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const bot = new Telegraf(TOKEN);
const msToDays = (ms: number): number => ms / (24 * 60 * 60 * 1000);
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

bot.telegram.getMe().then((me) => {console.log(me)})

bot.on("message", async (message) => {
    console.log("telegram message:", message.message);
    if (!message.from){return;}
    if (message.text){
        if (message.text.startsWith("/start")){
            sendMessage(
                "getUserById",
                {
                    id: message.from.id
                },
                {
                    message_id: message.msgId,
                    chat_id: message.chat.id,
                    from_id: message.from.id,
                    step: `verifyFrom${message.chat.type}`
                }
            )
        }
    }
});

socket.on("ok", async (submessage) => {
    console.log(submessage);
    if (submessage.method === "getUserById"){
        if (submessage.user === null){
            sendMessage("addUser", { id: submessage.shortcut.from_id });
        }
        if (submessage.shortcut.step === "verifyFromprivate"){
            return await bot.telegram.sendMessage(
                submessage.shortcut.chat_id,
                build("🔮 welcome to start panel\n\n☕ would u buy me a coffee ?\n") + `<code>${botwallet}</code>`,
                {
                    reply_parameters: {
                        message_id: submessage.shortcut.message_id
                    },
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: build("👛 buy"), callback_data: `buy_${submessage.shortcut.from_id}` }, { text: build("🔃 rebuy"), callback_data: `update_${submessage.shortcut.from_id}` }],
                            [{ text: build("🧶 buy mode"), callback_data: `buymode_${submessage.shortcut.from_id}` }]
                        ]
                    }
                }
            )
        } else if (submessage.shortcut.step === "verifyFromgroup" || submessage.shortcut.step === "verifyFromsupergroup"){
            if (submessage.shortcut.chat_id != submessage.user?.port_details?.chat){ // make it ==
                let _more_txt = ``;
                if ((submessage.user.port ?? "").length !== 0){
                    let bought_on_jalali = timestampToJalali(submessage.user.port_details.bought);
                    _more_txt += `\n\n<blockquote>` + build(`🌀 port: `) + `<code>${submessage.user.port}</code>\n`;
                    _more_txt += build(`👥 users: `) + `<code>${submessage.user.port_clients}</code>\n`;
                    _more_txt += build(`📝 chat: `) + `<code>${submessage.user.port_details.chat}</code>\n`;
                    _more_txt += build(`📊 status: `) + `<code>${submessage.user.port_details.expired === true ? "expired" : "activated"}</code>\n`;
                    _more_txt += build(`⌚ bought: `) + `<code>${bought_on_jalali}</code>\n`;
                    _more_txt += build(`⌛ you\`ve got [ `) + Math.floor(msToDays(submessage.user.port_details.expires - Date.now())) + build(` ] days`) + '</blockquote>';
                }
                
                return await bot.telegram.sendMessage(
                    submessage.shortcut.chat_id,
                    build(`🔮 welcome to start panel`) + `${_more_txt}\n\n` + build(`☕ would u buy me a coffee ?\n`) + `<code>${botwallet}</code>`,
                    {
                        reply_parameters: {
                            message_id: submessage.shortcut.message_id
                        },
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: build("👛 buy"), callback_data: `buy_${submessage.shortcut.from_id}` }, { text: build("🔃 rebuy"), callback_data: `update_${submessage.shortcut.from_id}` }],
                                [{ text: build("🧶 buy mode"), callback_data: `buymode_${submessage.shortcut.from_id}` }],
                                [{ text: build(`📰 request all`), callback_data: `requestall_${submessage.shortcut.from_id}` }, { text: build(`✏️ apk confs`), callback_data: `apkconfigs_${submessage.shortcut.from_id}` } ]
                            ]
                        }
                    }
                )
            }
        }
    }
});

function build(string: string) {
    return string.split('').map(char => translationTable[char] || char).join('');
}

function timestampToJalali(timestamp: number): string {
  const m = moment(timestamp);
  return m.format('jYYYY/jMM/jDD HH:mm:ss');
}

bot.launch();

// write Database/Client
// /start command must verify with Port.getPortByChat (if chat === supergroup or group) (if chat === private show buy/rebuy/buymode)
