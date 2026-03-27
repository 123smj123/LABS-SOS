//let express = require('express');
import express from 'express';
import cors from 'cors';
import { loadBackend } from './src/back/index.js';
import { handler } from './src/front/build/handler.js';
import dataStore from 'nedb';

//let bodyParser = require('body-parser');
import bodyParser from 'body-parser';

const app = express();
app.use(cors());

let PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

loadBackend(app);

app.use(handler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})