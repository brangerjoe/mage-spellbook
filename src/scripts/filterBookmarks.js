const fs = require('fs');
const path = require('path');

const inputFilePath = path.resolve(__dirname, './bookmarks.txt');
const outputFilePath = path.resolve(__dirname, './filteredBookmarks.txt');

const inputFileContent = fs.readFileSync(inputFilePath, 'utf-8');
const lines = inputFileContent.split(/\r?\n/); // This accounts for different types of line endings

let bookmarks = [];
let currentBookmark = {};

for (let line of lines) {
    if (line.startsWith('BookmarkBegin')) {
        if (currentBookmark.BookmarkTitle) {
            if (currentBookmark.BookmarkLevel === '2' || currentBookmark.BookmarkLevel === '3') {
                bookmarks.push(currentBookmark);
            }
            currentBookmark = {}; // reset the bookmark after processing
        }
    } else if (line.startsWith('BookmarkTitle:')) {
        currentBookmark.BookmarkTitle = line.split(': ')[1];
    } else if (line.startsWith('BookmarkLevel:')) {
        currentBookmark.BookmarkLevel = line.split(': ')[1].trim();
    } else if (line.startsWith('BookmarkPageNumber:')) {
        currentBookmark.BookmarkPageNumber = line.split(': ')[1];
    }
}

// Handle the last bookmark if present
if (currentBookmark.BookmarkTitle) {
    if (currentBookmark.BookmarkLevel === '2' || currentBookmark.BookmarkLevel === '3') {
        bookmarks.push(currentBookmark);
    }
}

console.log("Total Lines:", lines.length);
console.log("Total Bookmarks Parsed:", bookmarks.length);

// Convert bookmarks back to the original format
let outputContent = '';
for (let bookmark of bookmarks) {
    outputContent += 'BookmarkBegin\n';
    outputContent += `BookmarkTitle: ${bookmark.BookmarkTitle}\n`;
    outputContent += `BookmarkLevel: ${bookmark.BookmarkLevel}\n`;
    outputContent += `BookmarkPageNumber: ${bookmark.BookmarkPageNumber}\n`;
}

fs.writeFileSync(outputFilePath, outputContent);
console.log('Filtered bookmarks have been written to the file');
