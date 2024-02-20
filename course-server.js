const express = require('express');
const mongoose = require ('mongoose');

const courseRoutes = require('./routes/courseRoutes'); // Import routes

const app = express();
const PORT = process.env.PORT || 3003;

//TO ACCESS THE ROUTES TO BROWSER OR TEST IN POSTMAN WE DONT NEED TO EXPLICITLY WRITE THOSE OPERATIONS HERE 
//SINCE WE HAVE THE ROUTES, THE INITIAL ONES ARE DELETED

//Connect to MongoDB
mongoose.connect('mongodb+srv://decenafam96:LjAzilMxyJlr5vL9@cluster0.nhsr4t2.mongodb.net/?retryWrites=true&w=majority')
.then (() => {
  console.log('Connected to MOngoDB')
}).catch ((error) => {
  console.log()
})

app.use(express.json()); // Middleware to parse JSON bodies

// Use the courseRoutes
app.use('/api/courses', courseRoutes); // This line incorporates all routes