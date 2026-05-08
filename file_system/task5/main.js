const fs = require('node:fs/promises');
const path = require('node:path');
const formatter = require('./log_formatter.js');

const log = 'Okay, the task is done, buy';
formated_log = formatter(log);

(async () => {
    const pathname = path.resolve('console.txt');

    await fs.appendFile(pathname, `\n${formated_log}`);

    console.log('log in the console file completed successfuly');
})();