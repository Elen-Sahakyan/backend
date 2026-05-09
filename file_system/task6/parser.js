const parser = (data) => {
    const obj = {};

    const dataArray = data.split('\n');

    for(const item of dataArray) {
        const [key, value] = item.split('=');
        obj[key] = value;
    }

    return obj;
}

module.exports = parser;
