import React, { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addProduct = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Ürünler</h1>
      <div className="top-bar">
        <button className="bulk-action">Bulk Action</button>
        <input
          className="sort-by"
          placeholder="Sort By"
          disabled
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <ProductForm addProduct={addProduct} />
      <ProductList products={filteredProducts} deleteProduct={deleteProduct} />
    </div>
  );
}

export default App;
