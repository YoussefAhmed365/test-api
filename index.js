const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = 3000;

app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/libraryDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use('/books', bookRoutes);
// Main Path
app.get('/', (req, res) => {
  res.send('Welcome to the library!');
});

// Run Server
app.listen(port, () => {
  console.log(`Server works on http://localhost:${port}`);
});