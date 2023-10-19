const fs = require('fs');
const path = require('path');

const bookmarksFilePath = path.resolve(__dirname, './bookmarks.txt');
const sourceFilePath = path.resolve(__dirname, './source.txt');
const outputFilePath = path.resolve(__dirname, './modifiedSource.txt');

const bookmarksContent = fs.readFileSync(bookmarksFilePath, 'utf-8');
const sourceLines = fs.readFileSync(sourceFilePath, 'utf-8').split('\n');

let lines = bookmarksContent.split('\n');
let bookmarks = [];
let currentBookmark = {};

const sanitizeText = (text) => {
    return (text || '').toLowerCase().replace(/[^\w\s]/g, '').trim();
};

for (let line of lines) {
    if (line.startsWith('BookmarkBegin')) {
        if (currentBookmark.BookmarkTitle) {
            bookmarks.push(currentBookmark);
        }
        currentBookmark = {};
    } else if (line.startsWith('BookmarkTitle:')) {
        const match = line.match(/BookmarkTitle:\s*(.*)/);
        if (match) {
            currentBookmark.BookmarkTitle = match[1];
        }
    } else if (line.startsWith('BookmarkLevel:')) {
        currentBookmark.BookmarkLevel = line.split(': ')[1].trim();
    }
}

// Handle the last bookmark if present
if (currentBookmark.BookmarkTitle) {
    bookmarks.push(currentBookmark);
}

console.log(bookmarks)

for (let bookmark of bookmarks) {
    const sanitizedTitle = sanitizeText(bookmark.BookmarkTitle);
    let replacement;
    if (bookmark.BookmarkLevel === '2') {
        replacement = `=== ${bookmark.BookmarkTitle}`;
    } else if (bookmark.BookmarkLevel === '3') {
        replacement = `== ${bookmark.BookmarkTitle}`;
    } else if (bookmark.BookmarkLevel === '4') {
        replacement = `= ${bookmark.BookmarkTitle}`;
    } else {
        // console.warn(`Warning: Invalid BookmarkLevel ${bookmark.BookmarkLevel} for ${bookmark.BookmarkTitle}.`);
        continue; // Skip this bookmark as its level is not recognized.
    }

    let found = false;
    for (let i = 0; i < sourceLines.length; i++) {
        if (sanitizeText(sourceLines[i]) === sanitizedTitle) {
            sourceLines[i] = replacement;
            found = true;
            break;
        }
    }
    
    if (!found) {
        console.log(`Entry "${bookmark.BookmarkTitle}" from bookmarks.txt not found in source.txt`);
    }
}

// ... [rest of your code]


fs.writeFileSync(outputFilePath, sourceLines.join('\n'));
console.log('Replacements have been made in the file');
