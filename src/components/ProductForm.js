import React, { useState } from "react";
import "./ProductsForm.css";

function ProductForm({ addProduct }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({
      name: "",
      weight: "",
      cost: "",
      retailPrice: "",
      wholesalePrice: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input name="name" placeholder="Ürün Adı" value={product.name} onChange={handleChange} required />
      <input name="weight" placeholder="Gramajı (gr)" type="number" value={product.weight} onChange={handleChange} required />
      <input name="cost" placeholder="Maliyeti (₺)" type="number" value={product.cost} onChange={handleChange} required />
      <input name="retailPrice" placeholder="Perakende Satış Fiyatı (₺)" type="number" value={product.retailPrice} onChange={handleChange} required />
      <input name="wholesalePrice" placeholder="Toptan Satış Fiyatı (₺)" type="number" value={product.wholesalePrice} onChange={handleChange} required />
      <button type="submit">Ürün Ekle</button>
    </form>
  );
}

export default ProductForm;
