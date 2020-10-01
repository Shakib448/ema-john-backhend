const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qebvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 5000;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const productsCollection = client.db("emaJohnStore").collection("products");
  const ordersCollection = client.db("emaJohnStore").collection("orders");

  app.post("/addProduct", (req, res) => {
    const products = req.body;
    productsCollection.insertOne(products).then((result) => {
      console.log(result.insertedCount);
      res.send(result.insertedCount);
    });
  });

  app.get("/products", (req, res) => {
    productsCollection.find({}).toArray((err, doc) => {
      res.send(doc);
    });
  });

  app.get("/product/:key", (req, res) => {
    productsCollection.find({ key: req.params.key }).toArray((err, doc) => {
      res.send(doc[0]);
    });
  });

  app.post("/productsByKeys", (req, res) => {
    const productKeys = req.body;
    productsCollection
      .find({ key: { $in: productKeys } }) //$in check many value
      .toArray((err, doc) => {
        res.send(doc);
      });
  });

  app.post("/addOrder", (req, res) => {
    ordersCollection.insertOne(order).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello the db it's working in the heroku site");
});

app.listen(process.env.PORT || port);
