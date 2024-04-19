const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require ('mongoose');
const courseRoutes = require('./routes/courseRoutes.js'); // define routes

const app = express();


//had to remove that localhost since we gonna run serverlessly this time
//Connect to MongoDB i thinks its okay for just this cloud uri
mongoose.connect('mongodb+srv://decenafam96:LjAzilMxyJlr5vL9@cluster0.nhsr4t2.mongodb.net/?retryWrites=true&w=majority')
.then (() => {
  console.log('Connected to MOngoDB')
}).catch ((error) => {
  console.log('Failed to Connect!')
})
app.use(cors());
app.use(express.json()); // Middlewares
app.use(express.urlencoded({extended: true}));

// Use the courseRoutes
app.use('/.netlify/functions/api', courseRoutes);
module.exports.handler = serverless(app);