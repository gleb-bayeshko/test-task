const express = require("express");
const bodyParser = require("body-parser");
const { Router } = require("express");
const fetch = require("node-fetch");

const port = 4001;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/words", async (req, res) => {
  try {
    let response = await fetch("http://www.mrsoft.by/data.json");
    response = await response.json();
    return res.status(200).send(response.data);
  } catch (error) {
   console.log(error);
   return res.status(400).send('Error: Unable to send request or process response');
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on ${process.env.PORT || port} port`);
});
