const path = require('node:path');
const suffix = '_backup';

const path_builder = (filename, dir_path) => {
    const name = path.parse(filename).name;
    const extension = path.extname(filename);
    const new_name = name + suffix + extension;

    return path.join(dir_path, new_name);
}

module.exports = path_builder;
