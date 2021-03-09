const express = require("express");
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shuki:12345@cluster0.7o9mm.mongodb.net/beta_shop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });


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
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get("/api/products", async(req, res) => {
  const products = await Product.find({}).exec();
  const { q } = req.query;
  if (q) {
    res.send(products.filter((product) => product.title.includes(q)));
  } else {
    res.send(products);
  }
});
app.get("/api/products/:id", async(req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).exec();
  res.send(product ?? {});
});

app.post("/api/products", async(req, res) => {
  const { title, price, description, category, image } = req.body;
 await new Product({ title, price, description, category, image }).save();

  res.send("OK");
});
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;

  await Product.updateOne({ _id: id }, { title, price, description, category, image },{omitUndefined:true}).exec();
  res.send("OK!");
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  await Product.deleteOne({ _id: id }).exec();
  res.send("OK!");
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Example app listening on port 8000!");
});
