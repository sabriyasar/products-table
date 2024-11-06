const mongoose = require('mongoose');
const Product = require('../models/Product');

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

exports.handler = async (event) => {
  await connectDb();

  if (event.httpMethod === 'POST') {
    try {
      const productData = JSON.parse(event.body);
      const newProduct = new Product(productData);
      await newProduct.save(); // Ürünü kaydet
      return {
        statusCode: 201,
        body: JSON.stringify(newProduct),
      };
    } catch (error) {
      console.error('Error saving product:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to save product' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
