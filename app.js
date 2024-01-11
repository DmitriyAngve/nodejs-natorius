const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // this "express.json()" is middleware (middleware - is a function that can modify the incoming request data. Middle - because he stands between in the middle of the request and the response. It's just a step that the request goes through while it's beeng processed. And the step the requests go through, in the example is simply that the data from the body is added to it (added to the request object by using this middleware))

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
    status: 'success',
    results: tours.length, // for clients
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id/:x/:y', (req, res) => {
  console.log(req.params); // "req.params" - automatically assings the value to our variable, so our parameter that we defined in Postman ("{ id: '5', x: '23', y: '45' } in console")

  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1; // new Id
  const newTour = Object.assign({ id: newId }, req.body); // merge two objects together without mutated the original req.body

  tours.push(newTour); // добавлю новый тур в массив туров

  fs.writeFile(
    `{__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  ); // перепишу этот файл ("..., JSON.stringify(tours)" - это данные, которые нужно взять)
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
