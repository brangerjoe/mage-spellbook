var fs = require("fs");

// Helper function to clean a string for comparison
const cleanString = str => {
    return str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
};

// Read file content
var content = fs.readFileSync(require('path').resolve(__dirname, './spells.txt'), 'utf-8');
var lines = content.split("\n").filter(line => line.trim() !== ""); // filtering out empty lines

let outOfOrderLines = [];

for (let i = 1; i < lines.length - 1; i++) {
    if (cleanString(lines[i]) < cleanString(lines[i - 1]) || cleanString(lines[i]) > cleanString(lines[i + 1])) {
        outOfOrderLines.push(lines[i]);
    }
}

console.log("Lines not in proper alphabetical order:", outOfOrderLines);
