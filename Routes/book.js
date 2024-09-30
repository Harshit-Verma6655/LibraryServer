const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create new books
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search books by name or term
router.get('/search', async (req, res) => {
  const { term } = req.query;
  try {
    const books = await Book.find({ name: new RegExp(term, 'i') });
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Filter books by rent range
router.get('/filter', async (req, res) => {
  const { minRent, maxRent, category, term } = req.query;
  const filter = {};
  
  if (minRent || maxRent) filter.rentPerDay = { $gte: minRent || 0, $lte: maxRent || Infinity };
  if (category) filter.category = category;
  if (term) filter.name = new RegExp(term, 'i');

  try {
    const books = await Book.find(filter);
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
