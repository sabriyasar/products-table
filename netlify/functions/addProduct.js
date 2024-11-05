// netlify/functions/addProduct.js
const mongoose = require('mongoose');

// MongoDB bağlantı dizesi
const uri = process.env.MONGODB_URI;

// MongoDB Bağlantısı
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    weight: Number,
    cost: Number,
    retailPrice: Number,
    wholesalePrice: Number
}));

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const product = new Product(body);

        try {
            const savedProduct = await product.save();
            return {
                statusCode: 201,
                body: JSON.stringify(savedProduct),
            };
        } catch (error) {
            console.error('Ürün kaydetme hatası:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Ürün kaydetme başarısız.' }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Yalnızca POST yöntemi destekleniyor.' }),
        };
    }
};
