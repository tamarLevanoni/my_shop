const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shuki:12345@cluster0.7o9mm.mongodb.net/beta_shop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// const fs = require("fs");

// let products = require("./products");


const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});
const Product = mongoose.model("Product", productSchema);


const app = express();

// const corsOptions = {
//   origin: "http://localhost:3001",
//   optionsSuccessStatus: 200, 
// };
var whitelist = ['http://localhost:3000', 'http://localhost:3001']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(express.json());
// app.use(cors());
app.use(cors(corsOptions));



app.get("/products", async(req, res) => {
  const products = await Product.find({}).exec();
  const { q } = req.query;
  if (q) {
    res.send(products.filter((product) => product.title.includes(q)));
  } else {
    res.send(products);
  }
});
app.get("/products/:id", async(req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).exec();
  res.send(product ?? {});
});
app.get("/products/:id", async(req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({title}).exec();
  res.send(product ?? {});
});
app.post("/products", async(req, res) => {
  const { title, price, description, category, image } = req.body;
 await new Product({ title, price, description, category, image }).save();

  res.send("OK");
});
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;

  await Product.updateOne({ _id: id }, { title, price, description, category, image },{omitUndefined:true}).exec();
  res.send("OK!");
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  await Product.deleteOne({ _id: id }).exec();
  res.send("OK!");
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
