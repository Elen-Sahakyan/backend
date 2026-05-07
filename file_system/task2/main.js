const fs = require('node:fs/promises');
const path = require('node:path');
const finder = require('./finder.js');

(async () => {
    const dirPath = process.argv[2];
    const extension = process.argv[3];
    if(!dirPath || !extension) {
        console.log('directory/extension name is missing');
        return;
    }

    const dirContent = await fs.readdir(dirPath);

    const files_with_given_ext = finder(dirContent, extension);

    for(const file of files_with_given_ext) {
        console.log(path.join(dirPath, file));
    }

})();

