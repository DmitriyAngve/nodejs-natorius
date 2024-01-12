/*
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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params); // "req.params" - automatically assings the value to our variable, so our parameter that we defined in Postman ("{ id: '5' } in console")

  const id = req.params.id * 1; // преобразую строку в намбер
  const tour = tours.find((el) => el.id === id);

  // First solution for non-existent id
  // if (id > tours.length) {
  // Second solution for non-existent id
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
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

// app.patch('/api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here...>',
//     },
//   });
// });

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
*/

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the Middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTE HANDLERS

// 3) ROUTES

app.use('/api/v1/tours', tourRouter); // middleware, tourRouter = next()
app.use('/api/v1/users', userRouter);

// 4) START THE SERVER
module.exports = app;
