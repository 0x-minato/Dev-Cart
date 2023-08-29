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
import Login from "./pages/login/Login";
import ShowHeaderAndFooter from "./utils/ShowHeaderAndFooter";
import MyOrders from "./pages/myOrders/MyOrders.jsx";
import Devcart from "./abis/devcart.json";
import { useEffect } from "react";
import { ethers } from "ethers";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { useAccount } from "wagmi";
import { useState } from "react";

function App() {
  const [provider, setProvider] = useState(null);
  const [devcart, setDevcart] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const chains = [arbitrum, mainnet, polygon];
  const projectId = "b92b77240f2978701c2642521ececdf6";

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  const navigate = useNavigate();
  const { isConnected } = useAccount();

  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const devcart = new ethers.Contract(
      "0x5fbdb2315678afecb367f032d93f642f64180aa3",
      Devcart,
      provider
    );
    setDevcart(devcart);
  };

  useEffect(() => {
    if (!isConnected) {
      navigate("/login");
    }
    loadContract();
  }, []);

  return (
    <div>
      <ShowHeaderAndFooter>
        <Header />
      </ShowHeaderAndFooter>
      <WagmiConfig config={wagmiConfig}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </WagmiConfig>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route
          path="/cart"
          element={
            <Cart
              provider={provider}
              devcart={devcart}
              setCheckout={setCheckout}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout checkout={checkout} />} />
        <Route path="/myorders" element={<MyOrders devcart={devcart} />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
      <ShowHeaderAndFooter>
        <Footer />
      </ShowHeaderAndFooter>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}

export default App;
