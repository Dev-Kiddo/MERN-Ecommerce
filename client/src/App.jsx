import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
