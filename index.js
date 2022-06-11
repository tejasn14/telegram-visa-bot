require('dotenv').config()

const { BOT_TOKEN, MESSAGE_ID, EXTENSION_ACCESS_CODE, NOTIFY_INTERVAL_IN_MIN } = process.env
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')
const bot = new TelegramBot(BOT_TOKEN);
// const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const notificationInterval = NOTIFY_INTERVAL_IN_MIN * 60 * 1000;

console.log(`Started on ${new Date().toLocaleString()}`);

// bot.sendMessage(MESSAGE_ID, 'Bot Started!');

setInterval(async () => {
    const message = await getSlotInfo();
    bot.sendMessage(MESSAGE_ID, message);
    console.log(message);
}, notificationInterval);

const getSlotInfo = (async () => {
    const slots = await getSlotsApi();
    let total = 0;
    let location = '';
    slots.data.slotDetails.forEach((el, idx) => {
        if (idx % 2 == 0 && el.slots > 0) {
            total += el.slots
            location += `${el.visa_location} : ${el.slots} slots available\n`
        }
    });
    if (total == 0) {
        return "❌ ❌ No Slots ALL Locations ❌ ❌";
    } else {
        location = "✅ ✅ SLOTS AVAILABLE!!! ✅ ✅\n" + location;
        return location;
    }
});

const getSlotsApi = async () => {
    return await axios.get('https://app.checkvisaslots.com/slots/v1', {
        headers: {
            'origin': 'chrome-extension://beepaenfejnphdgnkmccjcfiieihhogl',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36',
            'x-api-key': EXTENSION_ACCESS_CODE,
        }
    });
}
