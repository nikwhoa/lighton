import fs from 'fs';

let json = fs.readFile('db.json', (err, data) => {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    console.log(jsonData);
});