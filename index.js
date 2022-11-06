// import domainPing from 'domain-ping';
import { createServer } from 'http-server';

const server = createServer({ root: './', cache: -1 });
server.listen(3010);

// my 195.128.25.26
// office 95.67.82.22

// const { exec } = require("child_process");
// import {exec} from 'child_process';

// exec("ping -c 10 195.128.25.26", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
