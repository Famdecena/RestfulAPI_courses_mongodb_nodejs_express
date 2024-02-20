const express = require('express');
const mongoose = require ('mongoose');
const app = express();
const port = 3003;

//acccess websites on web browser we need the following routes for example
app.get('/', (req, res) => {
    res.send('This is, Course-API!');
  });
  
  app.get('/about', (req, res) => {
    res.send('Today we will finally be able to connect MongoDB I claim it!.');
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

mongoose.connect('mongodb+srv://decenafam96:LjAzilMxyJlr5vL9@cluster0.nhsr4t2.mongodb.net/?retryWrites=true&w=majority')
.then (() => {
  console.log('Connected to MOngoDB')
}).catch ((error) => {
  console.log(error)
})
