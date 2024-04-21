const express = require('express');
const mongoose = require ('mongoose');
const serverless = require('serverless-http');
const cors = require('cors');
const courseRoutes = require('./functions/routes/courseRoutes.js'); // Import routes

const app = express();

const PORT = process.env.PORT || 8889; // i had to do this hahaha
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//we need the netlify to listen here


//Connect to MongoDB
mongoose.connect('mongodb+srv://decenafam96:U5EYoygrjGjJnmgq@cluster0.nhsr4t2.mongodb.net/?retryWrites=true&w=majority')
.then (() => {
  console.log('Connected to MOngoDB')
}).catch ((error) => {
  console.log("Failed Connection!", error.message);
});



app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json()); //parse JSON 
app.use(cors());
// Use the courseRoutes
app.use('/.netlify/functions/', courseRoutes); 

module.exports.handler = serverless(app);