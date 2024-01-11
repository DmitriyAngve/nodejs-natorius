const fs = require('fs');
const express = require('express');

const app = express();

// Get from our server
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

// ---------------------------------------

// (req, res) => {} - route handler

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length, // for clients
    data: {
      tours: tours, // from 21 string
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
