const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webApiRouter = require('./routers/routerApis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3030;

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI)
  

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB error:', err);
});
db.once('open', () => {
  console.log('MongoDB connected');
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

app.use('/project', webApiRouter);