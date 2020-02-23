const express = require('express');
const morgan = require('morgan');

const userRouter = require('./src/routes/userRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/users', userRouter);

module.exports = app;
