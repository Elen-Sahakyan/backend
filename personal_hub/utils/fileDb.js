const fs = require('node:fs/promises');

exports.readJson = async (pathname) => {
    const data = await fs.readFile(pathname, 'utf-8');
    return JSON.parse(data);
};

exports.writeJson = async (pathname, data) => {
    await fs.writeFile(pathname, JSON.stringify(data, null, 2));
};


