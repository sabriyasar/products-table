// netlify/functions/addProduct.js
const mongoose = require('mongoose');
const Product = require('../models/Product');

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};

exports.handler = async (event) => {
  await connectDb();

  if (event.httpMethod === 'POST') {
    const productData = JSON.parse(event.body);
    const newProduct = new Product(productData);
    await newProduct.save(); // Ürünü kaydet
    return {
      statusCode: 201,
      body: JSON.stringify(newProduct),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
