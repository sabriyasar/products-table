import React, { useState } from "react";
import ProductList from "./components/ProductList";
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
      <ProductList products={filteredProducts} deleteProduct={deleteProduct} />
    </div>
  );
}

export default App;
