const path = require('node:path');

const file_finder = (dir, ext) => {
    return dir.filter((file) => path.extname(file) == ext);
}

module.exports = file_finder;