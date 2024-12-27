const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/shopApp')
   .then((data) => {
      console.log('Mongo Database is connected!!');
   })
   .catch((err) => {
      console.log('Mongo Database is not connected!!');
      console.log(err);
   })

// const p = new Product({
//    name: 'Coconut',
//    price: 20,
//    category: 'fruit',
//    popular: { famous: true }
// })

// p.save().then(res => console.log(res))
//    .catch(err => console.log(err))

const productLists = [
   {
      name: 'Rose',
      price: 300,
      category: 'floWer',
   },
   {
      name: 'Cocunut Milk Shak',
      price: 20,
      category: 'fruit',
      popular: { region: 'North' }
   },
   {
      name: 'Potatoes',
      price: 60,
      category: 'Vagetable'
   },
   {
      name: 'Butter',
      price: 10,
      category: 'dairy',
      popular: { region: 'north-West', famous: true }
   },
   {
      name: 'Celebration',
      price: 120,
      category: 'Gift'
   },
   {
      name: 'Fairy Eggs Plants',
      price: 30,
      category: 'vagetable',
      popular: { famous: true }
   }
]

Product.insertMany(productLists)
   .then(res => console.log(res))
   .catch(err => console.log(err))