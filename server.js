const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = 5000;

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qebvf.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("emaJohnStore").collection("products");
  console.log("Data base connected");
  client.close();
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT);
