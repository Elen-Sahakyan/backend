const fs = require('node:fs/promises');
const path = require('node:path');
const path_builder = require('./path_builder');

const filename = 'path_builder.js';
const dest_folder = 'copies/backup';
const dest_folder_path = path.resolve(dest_folder);

const source = path.resolve(__dirname, filename);
const destination = path_builder(filename, dest_folder_path);

(async function copy () {
    try {
        await fs.copyFile(source, destination);
        console.log('file-copying succeeded');
    } catch (err) {
        if(err.code === 'ENOENT') {
            console.log('target folder is missing, creating ...');
            await fs.mkdir(dest_folder_path, { recursive: true });
            return copy();
        } else throw err;
    }
})();

