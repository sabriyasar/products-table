const mongoose = require('mongoose');

const uri = 'mongodb+srv://3datelier:zExawc8X9Mjil6BO@3d-products.jlnxe.mongodb.net/?retryWrites=true&w=majority&appName=3d-products';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB bağlantısı başarılı!');
    })
    .catch(err => {
        console.error('MongoDB bağlantısı başarısız:', err);
    });
