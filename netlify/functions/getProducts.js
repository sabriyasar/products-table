// netlify/functions/getProducts.js
const mongoose = require('mongoose');
const Product = require('../../src/models/Product'); // Model dosyanızı uygun şekilde ayarlayın

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};

exports.handler = async (event, context) => {
  await connectDb();

  const products = await Product.find(); // Tüm ürünleri al
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
