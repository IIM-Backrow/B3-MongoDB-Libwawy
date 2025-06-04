import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

app.use(logger('dev'));
app.use(express.json());

//ROutes

app.use(function(req, res, next) {
  next(createError(404));
});

export default app;
