// netlify/functions/updateProduct.js
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

exports.handler = async (event) => {
  await connectDb();

  if (event.httpMethod === 'PUT') {
    try {
      const productData = JSON.parse(event.body);

      const result = await Product.updateOne({ key: productData.key }, productData); // Ürünü güncelle

      if (result.matchedCount === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Product not found' }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Product updated successfully' }),
      };
    } catch (error) {
      console.error('Error updating product:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to update product' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
