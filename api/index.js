/* eslint-disable prettier/prettier */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const authRoutes = require('./router/authRoutes');
const userRoutes = require('./router/userRoutes');
const postRoutes = require('./router/postRoutes');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log('error connecting mongodb', err));

app.listen(port, () => {
  console.log('server is listening on port', port);
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
