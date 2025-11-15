import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Shop from "./components/shop";
import Product from "./components/Product";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
