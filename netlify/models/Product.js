// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Boşlukları otomatik olarak keser
  },
  weight: {
    type: Number,
    required: true,
    min: 0, // Negatif değer olamaz
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  retailPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  wholesalePrice: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true }); // CreatedAt ve UpdatedAt alanları eklenir

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
