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
