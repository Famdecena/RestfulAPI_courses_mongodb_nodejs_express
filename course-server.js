const express = require('express');
const app = express();
const port = 3003;

//acccess websites on web browser we need the following routes for example
app.get('/', (req, res) => {
    res.send('Hello, Course-API!');
  });
  
  app.get('/about', (req, res) => {
    res.send('Today we will finally be able to connect MongoDB I claim it!.');
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
