const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/shopApp')
   .then((data) => {
      console.log('Mongo Database is connected!!');
   })
   .catch((err) => {
      console.log('Mongo Database is not connected!!');
      console.log(err);
   })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


const categories = ['dairy', 'fruit', 'vagetable', 'flower', 'gift'];
app.get('/', (req, res) => {
   // res.send(`<div>
   //    <h1 style="text-align: center; margin-top: 200px;">
   //    Welcome to the Shoping App.<br>
   //    <p> How can I help you<p>
   //    </h1></div>`);
   res.render('product/home')
})

app.get('/product', async (req, res) => {
   const { category } = req.query;
   if (category) {
      const products = await Product.find({ category })
      res.render('product/index', { products, category })
   } else {
      const products = await Product.find({})
      res.render('product/index', { products, category: 'All' })
   }
})

app.get('/product/:id', async (req, res) => {
   const { id } = req.params;
   const foundProduct = await Product.findById(id);
   res.render('product/show', { foundProduct })
})

app.get('/products/new', (req, res) => {
   res.render('product/new', { categories })
})

app.post('/products', async (req, res) => {
   const newProduct = new Product(req.body)
   // const { name, price, category } = req.body;
   console.log(req.body);
   await newProduct.save();
   console.log(newProduct);
   res.redirect(`/product/${newProduct._id}`)
})

app.get('/product/:id/edit', async (req, res) => {
   const { id } = req.params;
   const product = await Product.findById(id);
   res.render('product/edit', { product, categories })
})

app.put('/product/:id', async (req, res) => {
   const { id } = req.params;
   const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
   res.redirect(`/product/${product._id}`)
})

app.delete('/product/:id', async (req, res) => {
   const { id } = req.params;
   const deleteid = await Product.findByIdAndDelete(id);
   res.redirect('/product');
})

app.get('*', (req, res) => {
   res.send('No route is found!')
})

app.listen(3000, () => {
   console.log('App is running on port: 3000');
})