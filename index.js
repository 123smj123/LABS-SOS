//let express = require('express');
import express from 'express';

//let bodyParser = require('body-parser');
import bodyParser from 'body-parser';

import { loadBackend } from './src/back/index.js';

const app = express();

let PORT = process.env.PORT || 3000;

app.use("/", express.static("./static"));
app.use(bodyParser.json());

loadBackend(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})