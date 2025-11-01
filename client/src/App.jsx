import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
