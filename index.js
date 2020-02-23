/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Database connection successful.'))
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is on port: ${port}`);
});
