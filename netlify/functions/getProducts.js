// netlify/functions/getProducts.js
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Model dosyanızı uygun şekilde ayarlayın

const connectDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection failed');
  }
};

exports.handler = async (event, context) => {
  await connectDb();

  try {
    const products = await Product.find(); // Tüm ürünleri al
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch products' }),
    };
  }
};
