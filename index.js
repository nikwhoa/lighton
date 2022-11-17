import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'
import cron from 'node-cron';



// const rawdata = fs.readFileSync('lighton.json')
//     console.log(rawdata.length);

// const asfd = async () => {

//     const rawdata = fs.readFileSync('lighton.json')
//     console.log(rawdata.length);
//     if (rawdata.length === 0) {
//         await new Promise(resolve => setTimeout(resolve, 20000));
//         console.log('waiting...');
//     }

//     let lightData = JSON.parse(rawdata);


//     const __dirname = dirname(fileURLToPath(import.meta.url));
//     const file = join(__dirname, 'db.json')
//     const adapter = new JSONFile(file)
//     const db = new Low(adapter)
//     await db.read()

//     db.data = db.data

//     // let trueTS = 1668636000000;
//     // let falseTS = 1668636000000;

//     function dhm(ms) {
//         const days = Math.floor(ms / (24 * 60 * 60 * 1000));
//         const daysms = ms % (24 * 60 * 60 * 1000);
//         const hours = Math.floor(daysms / (60 * 60 * 1000));
//         const hoursms = ms % (60 * 60 * 1000);
//         const minutes = Math.floor(hoursms / (60 * 1000));
//         const minutesms = ms % (60 * 1000);
//         const sec = Math.floor(minutesms / 1000);
//         return hours + " год. та " + minutes + " хв.";
//     }


//     if (lightData.lighton) {
//         let d1 = db.data.trueTS
//         let d2 = lightData.timestamp
//         db.data.falseTS = lightData.timestamp
//         db.data.statusBar = true
//         console.log(dhm(d2 - d1));
//         db.data.lighton = dhm(d2 - d1)
//     } else {
//         let d1 = db.data.falseTS
//         let d2 = lightData.timestamp
//         db.data.trueTS = lightData.timestamp
//         db.data.statusBar = false
//         console.log(dhm(d2 - d1));
//         db.data.lightoff = dhm(d2 - d1)
//     }


//     await db.write()
// }
cron.schedule('* * * * *', async function () {

    const rawdata = fs.readFileSync('lighton.json')
    console.log(rawdata.length);
    if (rawdata.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 40000));
        console.log('waiting...');
    }

    let lightData = JSON.parse(rawdata);


    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)
    await db.read()

    db.data = db.data

    // let trueTS = 1668636000000;
    // let falseTS = 1668636000000;

    function dhm(ms) {
        const days = Math.floor(ms / (24 * 60 * 60 * 1000));
        const daysms = ms % (24 * 60 * 60 * 1000);
        const hours = Math.floor(daysms / (60 * 60 * 1000));
        const hoursms = ms % (60 * 60 * 1000);
        const minutes = Math.floor(hoursms / (60 * 1000));
        const minutesms = ms % (60 * 1000);
        const sec = Math.floor(minutesms / 1000);
        return hours + " год. та " + minutes + " хв.";
    }


    if (lightData.lighton) {
        let d1 = db.data.trueTS
        let d2 = lightData.timestamp
        db.data.falseTS = lightData.timestamp
        db.data.statusBar = true
        console.log(dhm(d2 - d1));
        db.data.lighton = dhm(d2 - d1)
    } else {
        let d1 = db.data.falseTS
        let d2 = lightData.timestamp
        db.data.trueTS = lightData.timestamp
        db.data.statusBar = false
        console.log(dhm(d2 - d1));
        db.data.lightoff = dhm(d2 - d1)
    }


    await db.write()

    console.log('working!');
});