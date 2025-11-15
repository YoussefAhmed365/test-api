const mongoose = require('mongoose');

// 1. Define the Schema (the blueprint)
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // This field must be provided
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: false // This field is optional
    }
    // We can add more fields here later, like 'genre' or 'publishedYear'
});

// 2. Create the Model (the tool to interact with the 'books' collection)
// Mongoose will automatically look for the plural, lowercase version
// (so 'Book' becomes 'books')
const Book = mongoose.model('Book', bookSchema);

// 3. Export the Model so our server (index.js) can use it
module.exports = Book;