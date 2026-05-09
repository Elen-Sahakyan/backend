const path = require('node:path');
const fs = require('node:fs/promises');
const folders = require('./set_of_folders');

(async () => {
    for(const folder of folders) {
        const absalute_path = path.resolve(folder);
        try {
            await fs.mkdir(absalute_path, { recursive: true });
            console.log(`folder created: ${absalute_path}`);
        } catch (err) {
            console.error('error: ', err.message);
        }
    }
})();