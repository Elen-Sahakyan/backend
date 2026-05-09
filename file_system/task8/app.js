const fs = require('node:fs/promises');
const path = require('node:path');
const rename = require('./rename.js');

const folder = 'files';

(async () => {
    const dir_path = path.join(__dirname, folder);
    try {
        const files = await fs.readdir(dir_path, 'utf-8');
        
        for(const filename of files) {
            const new_name = rename(filename);

            const old_path = path.join(dir_path, filename);
            const new_path = path.join(dir_path, new_name);

            try {
                await fs.rename(old_path, new_path);
                console.log(`succeeded: ${filename} => ${new_name}`);
            } catch (err) {
                console.error(`failed: ${filename} => ${new_name} `, err.message);
            }
        }
    } catch (err) {
        console.error(err.message);
    }
})();