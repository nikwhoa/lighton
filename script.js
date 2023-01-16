// const dataBase = async () => {
//     const response = await fetch('db.json');
//     const json = await response.json()
//     return json;
// };
// const light = document.querySelector('.light');
// dataBase().then((res) => {
//     console.log(res.statusBar);
//     if (res.statusBar) {
//         light.classList.add('green');
//         light.innerHTML = `
//         <img src="https://iili.io/HzRZM4j.png" alt="light" style="height: auto;" class="light-gif"> <br>
//         <h1 class='green'>Світло</h1>
//         `;

//         document.querySelector('.check').innerHTML = 'Світло є <br> ' + res.lighton

//     } else {
//         document.querySelector('.check').innerHTML = 'Світло відсутнє <br> ' + res.lightoff
//         light.classList.add('red');
//         light.innerHTML = `
//         <img src="https://static.wixstatic.com/media/4cbb76_c5b3b6525d1245cf8de9e28f9f91ec04~mv2.gif" alt="light" style="height: auto;" class="dark-gif"> <br>
//         <h1>Темно</h1>
//         `;
//     }
//     console.log(res.lightoff);
// })

import { status, nextStatus, maybeStatus  } from "./test.js";

console.log(status);
console.log(nextStatus);
console.log(maybeStatus);