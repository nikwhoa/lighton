import fs from 'fs';
const date = new Date();
const time = date.toLocaleTimeString();


// const hour = 12;
const hour = date.getHours();
// const day = 'Monday';
const day = date.toLocaleDateString('en-US', { weekday: 'long' });

const data = fs.readFileSync('schedule.json');
const schedule = JSON.parse(data);


const currentDay = schedule[day];
const currentTime = currentDay[hour];

let status = '';
let nextStatus = '';
let maybeStatus = '';

if (currentTime === true) {
    status = '🗓️ За розкладом світло є';

    for (let i = hour; i <= 23; i++) {
        if (currentDay[i] === false) {
            let begin = i;
            while (currentDay[i] === false) {
                i++;
            }
            nextStatus = `🔦 Світла не буде з ${begin}:00 до ${i}:00`;
            break;
        }
    }

} else if (currentTime === 'maybe') {

    status = '🗓️ За розкладом:';

    for (let i = hour; i <= 23; i++) {
        if (currentDay[i] === 'maybe') {
            let begin = i;
            while (currentDay[i] === 'maybe') {
                i++;
            }
            maybeStatus = `🔦 Можливі відключення до ${i}:00`;
            // nextStatus = `💡 Світло буде з ${i}:00`;
            break;
        }
    }

    for (let i = hour; i <= 23; i++) {
        if (currentDay[i] === true) {
            let begin = i;
            while (currentDay[i] === true) {
                i++;
            }
            nextStatus = `💡 Світло буде з ${begin}:00 до ${i}:00`;
            // nextStatus = `💡 Світло буде з ${i}:00`;
            break;
        }
    }

} else {
    status = '🗓️ За розкладом: \n 🔦 Світло відсутнє';

    for (let i = hour; i < 23; i++) {
        if (currentDay[i] === true) {
            let begin = i;
            while (currentDay[i] === true) {
                i++;
            }
            nextStatus = `💡 Світло буде з ${begin}:00 до ${i}:00`;
            // nextStatus = `💡 Світло буде о ${i}:00`;
            break;
        }
    }

    for (let i = hour; i < 23; i++) {
        if (currentDay[i] === 'maybe') {
            let begin = i;

            while (currentDay[i] === 'maybe') {
                i++;
            }

            maybeStatus = `🔦 Можливі відключення з ${begin}:00 до ${i}:00`;
            // maybeStatus = `☝️ Можливе включення з ${i}:00 до ${i + 1}:00`;
            break;
        }
    }
}

if (hour >= 22) {
    const nextDay = schedule[Object.keys(schedule)[Object.keys(schedule).indexOf(day) + 1]];
    for (let i = 0; i < 23; i++) {
        if (nextDay[i] === true) {
            nextStatus = `💡 Світло буде о ${i}:00`;
            break;
        }
    }
    for (let i = 0; i < 23; i++) {
        if (nextDay[i] === 'maybe') {
            maybeStatus = `🔦 Можливі включення о ${i}:00`;
            break;
        }
    }
}

export { status, nextStatus, maybeStatus };