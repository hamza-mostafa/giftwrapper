require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const pdfsRouter = require('./routes/pdfs');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp/downloaded'
}));
app.use(logger('dev'));
app.use(express.json());

app.use('/pdfs', pdfsRouter);

module.exports = app;
