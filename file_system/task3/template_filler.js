const filler = (template, title) => {
    return template.replace('{{title}}', title);
}

module.exports = filler;