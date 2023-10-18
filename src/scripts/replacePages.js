const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.resolve(__dirname, './source.txt'), 'utf-8');
const lines = text.split('\n');

const regex = /^[A-Z][^\d]+ \d+$/; // Matches lines that start with a capital letter followed by a format "Name Space Number"

const ignoreStartWords = /^(Entropy|Prime|Spirit|Correspondence|Life|Mind|Matter|Time|Forces|Data|Primal Utility|Dimensional Science|Science)/;

let newContent = [];

lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!(
        regex.test(trimmedLine) && 
        !trimmedLine.includes('page') && 
        !trimmedLine.includes(',') && 
        !trimmedLine.includes('.') && 
        !trimmedLine.includes('pas') && 
        !ignoreStartWords.test(trimmedLine) && 
        !trimmedLine.toLowerCase().includes('any sphere')
    )) { 
        newContent.push(line); // Only add the line to new content if it doesn't match our criteria
    }
});

// Overwrite the source file with the updated content
fs.writeFileSync(path.resolve(__dirname, './source.txt'), newContent.join('\n'));

console.log('Source file updated.');
