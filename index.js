let cool = require("cool-ascii-faces");

let express = require('express');
let boyParser = require('body-parser');
const app = express();

let PORT = process.env.PORT || 3000;

let BASE_URL_API = "/api/v1";

app.use("/", express.static("./static"));
app.use(boyParser.json());

let contacts = [
  {
    name: "John Doe",
    phone: "123456789"
  },
  {
    name: "Jane Smith",
    phone: "987654321"
  }
];

app.get(`${BASE_URL_API}/contacts`, (req, res) => {
  let jsonData = JSON.stringify(contacts, null, 2);
  console.log(`Datos: ${jsonData}`);
  res.send(jsonData);
});

app.post(`${BASE_URL_API}/contacts`, (req, res) => {
  let newContat = req.body;
  contacts.push(newContat);
  console.log(`Nuevo contacto: ${JSON.stringify(newContat)}`);
  res.send(201, "CREATED");
});

/*
console.log(cool());

//import express from 'express'


app.use("/", express.static("./static"));

app.get('/faces', (req, res) => {
  //res.send('Hello World');
  res.send(`<html><body><h1> 
        ${cool()}
        +</h1></body></html>`)
})
*/
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})