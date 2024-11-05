// netlify/functions/deleteProduct.js
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

  if (event.httpMethod === 'DELETE') {
    try {
      const { key } = JSON.parse(event.body);
      await Product.deleteOne({ key }); // Ürünü sil
      return {
        statusCode: 204,
        body: JSON.stringify({ message: 'Product deleted successfully' }),
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to delete product' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
