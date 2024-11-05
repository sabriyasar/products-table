import React, { useState } from "react";
import "./ProductsForm.css";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    weight: "",
    cost: "",
    retailPrice: "",
    wholesalePrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const addProduct = async (productData) => {
    const response = await fetch('/.netlify/functions/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Ürün eklenirken bir hata oluştu.');
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await addProduct(product);
      console.log('Ürün başarıyla eklendi:', newProduct);
      // Başarılı işlem sonrası yapılacaklar (örn. formu temizle)
      setProduct({
        name: "",
        weight: "",
        cost: "",
        retailPrice: "",
        wholesalePrice: "",
      });
    } catch (error) {
      console.error(error.message);
      // Hata mesajını kullanıcıya göster
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        name="name"
        placeholder="Ürün Adı"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        name="weight"
        placeholder="Gramajı (gr)"
        type="number"
        value={product.weight}
        onChange={handleChange}
        required
      />
      <input
        name="cost"
        placeholder="Maliyeti (₺)"
        type="number"
        value={product.cost}
        onChange={handleChange}
        required
      />
      <input
        name="retailPrice"
        placeholder="Perakende Satış Fiyatı (₺)"
        type="number"
        value={product.retailPrice}
        onChange={handleChange}
        required
      />
      <input
        name="wholesalePrice"
        placeholder="Toptan Satış Fiyatı (₺)"
        type="number"
        value={product.wholesalePrice}
        onChange={handleChange}
        required
      />
      <button type="submit">Ürün Ekle</button>
    </form>
  );
}

export default ProductForm;
