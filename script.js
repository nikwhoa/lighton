const data = async () => {
    const response = await fetch('lighton.json');
    const json = await response.json();
    return json;
};

let hours = null;
let minutes = null;
let seconds = null;
const light = document.querySelector('.light');

data().then((res) => {

    if (res.lighton) {
        light.classList.add('green');
        light.textContent = '💡';
    } else {
        light.classList.add('red');
        light.textContent = '🔦';
    }

    hours = res.hours;
    minutes = res.minutes;
    seconds = res.seconds;
    document.querySelector('.hours').textContent = hours;
    document.querySelector('.minutes').textContent = minutes;
    document.querySelector('.seconds').textContent = seconds;
});

const dataBase = async () => {
    const response = await fetch('db.json');
    const json = await response.json()
    return json;
};

dataBase().then((res) => {
    console.log(res.statusBar);
    if (res.statusBar) {
        document.querySelector('.check').textContent = 'Світло є приблизно ' + res.lighton + ' 🥳'
    } else {
        document.querySelector('.check').textContent = 'Світла немає приблизно ' + res.lightoff
    }
    console.log(res.lightoff);
})