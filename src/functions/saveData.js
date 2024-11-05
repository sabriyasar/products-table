// functions/saveData.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://3datelier:zExawc8X9Mjil6BO@3d-products.jlnxe.mongodb.net/?retryWrites=true&w=majority&appName=3d-products';

// MongoDB Modeli
const ProductSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    cost: Number,
    retailPrice: Number,
    wholesalePrice: Number,
});

const Product = mongoose.model('Product', ProductSchema);

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);
        
        // MongoDB'ye bağlan
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Veriyi kaydet
        const product = new Product(data);
        await product.save();

        // Bağlantıyı kapat
        mongoose.connection.close();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Veri başarıyla kaydedildi' }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Yalnızca POST istekleri desteklenmektedir' }),
    };
};
