import fs from 'fs';
const date = new Date();
const time = date.toLocaleTimeString();


// const hour = 21;
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

    // next true status
    // for (let i = hour; i <= 23; i++) {
    //     if (currentDay[i] === true) {
    //         nextStatus = `💡 Світло буде о ${i}:00`;
    //         break;
    //     }
    // }

    for (let i = hour; i <= 23; i++) {
        if (currentDay[i] === false) {
            nextStatus = `🔦 Світло буде вимкнене о ${i}:00`;
            break;
        }
    }

    // for (let i = hour; i <= 23; i++) {
    //     if (currentDay[i] === 'maybe') {
    //         maybeStatus = `☝️ Можливе вимкнення о ${i}:00`;
    //         break;
    //     }
    // }

} else if (currentTime === 'maybe') {
    status = '🗓️ За розкладом можливо відключення';

    for (let i = hour; i <= 23; i++) {
        if (currentDay[i] === true) {
            nextStatus = `💡 Світло буде о ${i}:00`;
            break;
        }
    }
    for (let i = hour; i <= 23; i++) {
        if (currentDay[i] === false) {
            maybeStatus = `🔦 Світла не буде з ${i}:00`;
            break;
        }
    }
} else {
    status = '🗓️ За розкладом світла немає';

    for (let i = hour; i < 23; i++) {
        if (currentDay[i] === true) {
            nextStatus = `💡 Світло буде о ${i}:00`;
            break;
        }
    }

    for (let i = hour; i < 23; i++) {
        if (currentDay[i] === 'maybe') {
            maybeStatus = `☝️ Можливе включення о ${i}:00`;
            break;
        }
    }

    // for (let i = hour; i < 23; i++) {
    //     if (currentDay[i] === false) {
    //         maybeStatus = `🔦 Світла не буде з ${i}:00`;
    //         break;
    //     }
    // }
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
            maybeStatus = `☝️ Можливе включення о ${i}:00`;
            break;
        }
    }
}

export { status, nextStatus, maybeStatus };