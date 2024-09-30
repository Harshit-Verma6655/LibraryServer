const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended:false}));


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const booksRoutes = require('./Routes/books');
const usersRoutes = require('./Routes/users');
const transactionsRoutes = require('./Routes/transactions');




mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/transactions', transactionsRoutes);

module.exports=app;