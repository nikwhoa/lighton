import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()
db.data = db.data

const fileCount = join(__dirname, 'countHours.json')
const adapterCount = new JSONFile(fileCount)
const dbCount = new Low(adapterCount)
await dbCount.read()
dbCount.data = dbCount.data

// now time
// const now = new Date();
const now = 1673994240000;
let differece = null
let hours = null
let minutes = null
// total time
let totalHours = null
let totalMinutes = null

if (db.data.statusBar) {
    differece = now - dbCount.data.startTS;
    // passed time
    hours = Math.floor(differece / 1000 / 60 / 60);
    minutes = Math.floor(differece / 1000 / 60) - (hours * 60);
    // count total time
    totalHours = Math.floor(dbCount.data.totalTime / 1000 / 60 / 60);
    totalMinutes = Math.floor(dbCount.data.totalTime / 1000 / 60) - (totalHours * 60);
    dbCount.data.lighton = `${hours}h ${minutes}m`;
    dbCount.data.totalTime = dbCount.data.totalTime + differece;
    await dbCount.write();
} else {
    differece = now - dbCount.data.startTS;
    // passed time
    hours = Math.floor(differece / 1000 / 60 / 60);
    minutes = Math.floor(differece / 1000 / 60) - (hours * 60);
    dbCount.data.lighton = `${hours}h ${minutes}m`;
    await dbCount.write();
}

dbCount.data.startTS = now;
await dbCount.write();


console.log(hours, minutes);