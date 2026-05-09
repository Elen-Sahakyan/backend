const fs = require('node:fs/promises');
const path = require('node:path');

const parser_path = path.join(__dirname, 'parser.js');
const parser = require(parser_path);

const validator_path = path.join(__dirname, 'validator.js');
const valdiator = require(validator_path);

const env_path = path.join(__dirname, 'config.env');

const env_content = fs.readFile(env_path, 'utf-8');

env_content.then((data) => {
    const parsed_data = parser(data);
    console.log(valdiator(parsed_data)); 
},
(err) => {
    console.log(err.message);
});