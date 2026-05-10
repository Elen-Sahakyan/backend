const fs = require('node:fs/promises');
const path = require('node:path');
const data = require('./source.js');
const { clear } = require('node:console');

const target_file_path = path.resolve('data.json');

(async () => {
    const {size} = await fs.stat(target_file_path);
    
    if(size < 1024) {
        const stringified = JSON.stringify(data);
        await fs.writeFile(target_file_path, stringified, 'utf-8');
        console.log(`information written in: '${target_file_path}'`);
    } else {
        console.log(`file '${target_file_path}' was full`);
    }
})();