const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      maxlength: 30
   },
   price: {
      type: Number,
      required: true,
   },
   category: {
      type: String,
      enum: ['dairy', 'fruit', 'vagetable', 'flower', 'gift'],
      lowercase: true
   },
   popular: {
      region: {
         type: String,
         default: 'All',
         lowercase: true
      },
      famous: {
         type: Boolean,
         default: false
      }
   }
})

const Product = mongoose.model('Product', productSchema, 'productDetail')

module.exports = Product;