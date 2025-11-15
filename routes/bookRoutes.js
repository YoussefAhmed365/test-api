const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');

/* --- Routes --- */

// C - CREATE a new book
// We use 'async' because 'await' is used inside (to wait for the database)
router.post('/', async (req, res) => {
  // A 'try...catch' block is essential to handle potential errors
  try {
    // 1. Get data from the request body (this requires 'app.use(express.json())')
    const { title, author, pages } = req.body;

    // 2. Create a new document instance using our Book model
    const newBook = new Book({
      title,
      author,
      pages,
    });

    // 3. Save the new document to the database
    // '.save()' is an async operation, so we 'await' it
    const savedBook = await newBook.save();

    // 4. Send a success response (HTTP 201 - Created) with the saved book data
    res.status(201).json(savedBook);

  } catch (error) {
    // 5. If an error happens (e.g., validation error), send an error response
    // HTTP 400 - Bad Request
    res.status(400).json({ message: error.message });
  }
});

// R - READ all books
router.get('/', async (req, res) => {
  try {
    // 1. Find all documents in the 'Book' collection
    // 'Book.find()' is async, so we 'await' it
    // Passing an empty object {} means "find all"
    const books = await Book.find({});

    // 2. Send the list of books as a JSON response
    // HTTP 200 - OK (this is the default, so .status(200) is optional)
    res.json(books);

  } catch (error) {
    // 500 - Internal Server Error (something went wrong with the database)
    res.status(500).json({ message: error.message });
  }
});

// U - UPDATE a book by its ID
// We use PATCH for partial updates
router.patch('/:id', async (req, res) => {
  try {
    // 1. Get the ID from the URL parameters
    const { id } = req.params;

    // 2. Get the new data from the request body
    const updates = req.body;

    // 3. Find the book by its ID and update it
    // 'new: true' tells Mongoose to return the *updated* version of the document
    const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });

    // 4. Check if a book was actually found and updated
    if (!updatedBook) {
      // 404 - Not Found
      return res.status(404).json({ message: 'Book not found' });
    }

    // 5. Send back the updated book
    res.json(updatedBook);

  } catch (error) {
    // 400 - Bad Request (e.g., invalid ID format or validation error)
    res.status(400).json({ message: error.message });
  }
});

// D - DELETE a book by its ID
router.delete('/:id', async (req, res) => {
  try {
    // 1. Get the ID from the URL parameters
    const { id } = req.params;

    // 2. Find the book by its ID and delete it
    const deletedBook = await Book.findByIdAndDelete(id);

    // 3. Check if a book was actually found and deleted
    if (!deletedBook) {
      // 404 - Not Found
      return res.status(404).json({ message: 'Book not found' });
    }

    // 5. Send a confirmation message (or the deleted book)
    // 200 - OK (or 204 - No Content)
    res.json({ message: 'Book deleted successfully', book: deletedBook });

  } catch (error) {
    // 500 - Internal Server Error (e.g., invalid ID format)
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;