// netlify/functions/deleteProduct.js
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

  if (event.httpMethod === 'DELETE') {
    const { key } = JSON.parse(event.body);
    await Product.deleteOne({ key }); // Ürünü sil
    return {
      statusCode: 204,
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
