const fs = require("node:fs").promises;
const path = require("node:path");
const data_modifier = require("./data-processor.js");

(async () => { 
    const inputPath = path.resolve('input.json');

    let json = await fs.readFile(inputPath, "utf-8");

    json = JSON.stringify(data_modifier(JSON.parse(json))) 
    
    const outputPath = path.resolve('output.json');

    fs.writeFile(outputPath, json);

})();










