const express = require('express');
const morgan = require('morgan');

const errorHandler = require('./src/controllers/errorController');

const userRouter = require('./src/routes/userRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find '${req.originalUrl}' on this server!`
  });
});

app.use(errorHandler);

module.exports = app;
