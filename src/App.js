import "./App.scss";
import Header from "./components/header/Header";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import ProductDescription from "./pages/productDescription/ProductDescription.jsx";
import Cart from "./pages/cart/Cart.jsx";
import About from "./pages/about/About.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import Loader from "./components/loader/Loader.jsx";
import Footer from "./components/footer/Footer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDescription />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
