// netlify/functions/updateProduct.js
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

  if (event.httpMethod === 'PUT') {
    const productData = JSON.parse(event.body);
    await Product.updateOne({ key: productData.key }, productData); // Ürünü güncelle
    return {
      statusCode: 204,
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
