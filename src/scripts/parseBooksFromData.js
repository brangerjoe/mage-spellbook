const fs = require('fs');

const data = require('../data.json'); // Assuming your data file is named data.json

// Extract all unique book names
const books = [];
data.forEach(spell => {
  spell.books.forEach(book => {
    const match = book.match(/^(.+?) page/);
    if (match) {
      let bookName = match[1].trim();
      // Remove any text in parentheses from the end
      bookName = bookName.replace(/\s*\([^)]+\)$/, '').trim();
      if (bookName.endsWith(',')) {
        bookName = bookName.slice(0, -1).trim(); // Remove trailing comma and re-trim
      }
      if (!books.includes(bookName)) {
        books.push(bookName);
      }
    }
  });
});

// Sort the books alphabetically
books.sort();

console.log(books);
