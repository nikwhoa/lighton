import fs from 'fs';
import {Telegraf} from 'telegraf'
// import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'


const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()



dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

const data = JSON.parse(fs.readFileSync('db.json'));

const response = data.statusBar;

const light = response ? 'Світло з\'явилось 💡' : 'Світло зникло 🔦'

await new Promise(resolve => setTimeout(resolve, 15000));

db.data = db.data

console.log(`bot working ${new Date().toLocaleTimeString()}`);

bot.start((ctx) => ctx.reply('Вітаю, для перевірки чи є світло: напишіть "світло" чи "свет", також можна перевірити за допомогою команди /checklight (просто нажміть на неї у цьому повідомленні 😉)'));
bot.command('checklight', (ctx) => {
    const name = ctx.message.from.first_name;
    ctx.reply(`Вітаю, ${name} \n${response ? `Світло є 💡\nПриблизно ${db.data.lighton}` : `Світла немає 🔦\nПриблизно ${db.data.lightoff}`}`)
})
bot.command('help', (ctx) => {
    const name = ctx.message.from.first_name;
    ctx.reply(`Вітаю, ${name}! \nЦей бот був створений для перевірки світла. Фактично перевіряється доступ окремої ip-адреси до інтернету, якщо доступ є то і світло є. На 100% довіряти боту не потрібно, тому що світло може бути, але якщо не буде інтернету то бот буде казати що світла немає.`)
})

bot.on('message', (ctx) => {
    if (ctx.message.text.includes('світло') || ctx.message.text.includes('свет') || ctx.message.text.includes('Свет') || ctx.message.text.includes('Світло')) {
        ctx.reply(`${response ? 'Світло є 💡' : 'Світла немає 🔦'}`)
    } else {
        ctx.reply('Не розумію 😔')
    }
});

if (db.data.diff) {
    bot.telegram.sendMessage('@lightparadiseavenue', light);
}

bot.launch();
