const fs = require('node:fs');
const path = require('node:path');
const template_filler = require('./template_engine.js');

const variables = {
    name: 'Bob',
    age: 22,
    specialty: 'lawyer'
}

const template_path = path.resolve('template.txt');

const content = fs.readFileSync(template_path, 'utf8');

const completed_template = template_filler(content, variables);

const folder_path = path.join(__dirname, 'output');

const file_path = path.join(folder_path, 'file.txt');

fs.mkdirSync(folder_path, { recursive: true });

fs.writeFileSync(file_path, `\n${completed_template}`, { flag: 'a' });

console.log(`Template is completed successfully. Path: ${file_path}`);





