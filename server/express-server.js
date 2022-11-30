const express = require('express');
const morgan = require('morgan'); //outputs request data

/////////////////////////////////
/// Configuration / Set up
/////////////////////////////////
const app = express();
const PORT = 3001;

/////////////////////////////////
/// Middleware
/////////////////////////////////

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/////////////////////////////////
/// Listener
/////////////////////////////////

app.listen(PORT, () => {
  console.log('Our Express app is listening on PORT: ', PORT);
});

/////////////////////////////////
/// Routes
/////////////////////////////////

const geoGameRouter = require('./routes/geo-game-router');
//First argument is parent path, all routes will be under this parent route
app.use('/geo-game', geoGameRouter)

