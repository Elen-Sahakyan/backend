const fs = require('node:fs/promises');
const path = require('node:path');
const template = require('./html.js');
const filler = require('./template_filler.js');

const title = process.argv.slice(2).join(' ');

const completed_html = filler(template, title);

const html_filename = `${title.split(' ').join('_')}.html`;
const html_path = path.resolve('html_files', html_filename);

(async () => {
    await fs.writeFile(html_path, completed_html);

    console.log(`html template is filled accordingly. Absalute Path: ${html_path}`);
})();
