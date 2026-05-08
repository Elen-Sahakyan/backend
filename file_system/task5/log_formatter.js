const formatter = (msg) => {
    const timestamp = new Date().toLocaleString();

    return timestamp + ' ' + msg;
}

module.exports = formatter;