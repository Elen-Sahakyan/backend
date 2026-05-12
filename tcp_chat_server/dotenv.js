const fs = require('node:fs');
const path = require('node:path');

const env_path = './.env';

const readENV = () => {
    const existing = fs.existsSync(env_path);

    if(!existing) return;

    const data = fs.readFileSync(env_path, 'UTF-8');

    const dataArray = data.split('\n');

    for(const item of dataArray) {
        const [key, value] = item.split('=');

        process.env[key] = value;
    }
}

readENV();