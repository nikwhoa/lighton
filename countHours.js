import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'
import dayjs from 'dayjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'lighton.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()
db.data = db.data

const fileDB = join(__dirname, 'db.json')
const adapterDB = new JSONFile(fileDB)
const dbDB = new Low(adapterDB)
await dbDB.read()
dbDB.data = dbDB.data

const fileCount = join(__dirname, 'countHours.json')
const adapterCount = new JSONFile(fileCount)
const dbCount = new Low(adapterCount)
await dbCount.read()
dbCount.data = dbCount.data

const diff = dbDB.data.diff;
const light = dbDB.data.statusBar;

if (diff) {
    dbCount.data.begin = new Date().getTime();

    if (!light) {
        dbCount.data.lightoff.lightoffTime = [...dbCount.data.lightoff.lightoffTime, new Date().getTime()];
        dbCount.data.lightoff.time = [...dbCount.data.lightoff.time, new Date().toLocaleString('uk-UA', { month: 'long', day: 'numeric' ,hour: 'numeric', minute: 'numeric', second: 'numeric' })];

        const diffHour = dayjs(dbCount.data.lightoff.lightoffTime[dbCount.data.lightoff.lightoffTime.length - 1]).diff(dayjs(dbCount.data.lighton.lightonTime[dbCount.data.lighton.lightonTime.length - 1]), 'hour');
        const diffMinute = dayjs(dbCount.data.lightoff.lightoffTime[dbCount.data.lightoff.lightoffTime.length - 1]).diff(dayjs(dbCount.data.lighton.lightonTime[dbCount.data.lighton.lightonTime.length - 1]), 'minute') % 60;
        const diffSecond = dayjs(dbCount.data.lightoff.lightoffTime[dbCount.data.lightoff.lightoffTime.length - 1]).diff(dayjs(dbCount.data.lighton.lightonTime[dbCount.data.lighton.lightonTime.length - 1]), 'second') % 60;

        dbCount.data.lightoff.output = [...dbCount.data.lightoff.output ,{
            "nolight": {
                "hours": diffHour,
                "minutes": diffMinute,
                "seconds": diffSecond,
            }
        }]

    } else {
        dbCount.data.lighton.lightonTime = [...dbCount.data.lighton.lightonTime, new Date().getTime()];
        dbCount.data.lighton.time = [...dbCount.data.lighton.time, new Date().toLocaleString('uk-UA', { month: 'long', day: 'numeric' ,hour: 'numeric', minute: 'numeric', second: 'numeric' })];

        const diffHour = dayjs(dbCount.data.lighton.lightonTime[dbCount.data.lighton.lightonTime.length - 1]).diff(dayjs(dbCount.data.lightoff.lightoffTime[dbCount.data.lightoff.lightoffTime.length - 1]), 'hour');
        const diffMinute = dayjs(dbCount.data.lighton.lightonTime[dbCount.data.lighton.lightonTime.length - 1]).diff(dayjs(dbCount.data.lightoff.lightoffTime[dbCount.data.lightoff.lightoffTime.length - 1]), 'minute') % 60;
        const diffSecond = dayjs(dbCount.data.lighton.lightonTime[dbCount.data.lighton.lightonTime.length - 1]).diff(dayjs(dbCount.data.lightoff.lightoffTime[dbCount.data.lightoff.lightoffTime.length - 1]), 'second') % 60;

        dbCount.data.lighton.output = [...dbCount.data.lighton.output ,{
            "light": {
                "hours": diffHour,
                "minutes": diffMinute,
                "seconds": diffSecond,
            }
        }]
    }


    await dbCount.write();
}
// const minute = now.diff(begin, 'minute') % 60;
// const second = now.diff(begin, 'second') % 60;


if (new Date().getHours() === 23 && new Date().getMinutes() === 59 && new Date().getSeconds() === 50) {
    dbCount.data.total = [...dbCount.data.total, {
        day: new Date().getDate(),
        month: new Date().toLocaleString('uk-UA', { month: 'long' }),
        "totalHoursOff": dbCount.data.lightoff.lightoffHours,
        "totalMinutesOff": dbCount.data.lightoff.lightoffMinutes,
        "totalHoursOn": dbCount.data.lighton.lightonHours,
        "totalMinutesOn": dbCount.data.lighton.lightonMinutes,
    }]
    await dbCount.write();
    await new Promise(resolve => setTimeout(resolve, 8000));
    dbCount.data.begin = new Date().getTime();
    dbCount.data.lightoff = {
        lightoffTimeStamp: 0,
        lightoffHours: 0,
        lightoffMinutes: 0,
    }
    dbCount.data.lighton = {
        lightonTimeStamp: 0,
        lightonHours: 0,
        lightonMinutes: 0,
    }

}
console.log(`Counting hours... ${new Date().toLocaleString('uk-UA', { month: 'long', day: 'numeric' ,hour: 'numeric', minute: 'numeric', second: 'numeric' })}`);
await dbCount.write();