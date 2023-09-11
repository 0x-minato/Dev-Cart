import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "../../components/loader/Loader";
import ProductCard from "../../components/productCard/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from "../../assets/emptyCart.png";
import { cartTotalReducer } from "../../redux/cart/CartSlice";
import ethereum from "../../assets/ethereum.png";
import { ethers } from "ethers";
import axios from "axios";

const Cart = ({ provider, devcart, setCheckout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartArray = useSelector((state) => state.cart.cartArray);
  const [loading, setLoading] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setTotalPrice(0);
    if (cartArray == null ? 0 : cartArray.length > 0) {
      cartArray.map((product, index) => {
        setTotalItems(index + 1);
        setTotalPrice((prev) => prev + product.productTotal);
        return true;
      });
    } else {
      setTotalItems(0);
      setTotalPrice(0);
    }
  }, [cartArray]);

  const buyHandler = async () => {
    setLoading(true);
    //send data to IPFS
    const apiKey = "970663417e7a98c43c1d";
    const apiSecretKey =
      "20f95e433d89684ae98701d92ce2b26cdeab8cbfdc7f4b516e22088fb1d977ff";
    const jsonData = JSON.stringify(cartArray);

    // Create a temporary file to store the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });
    const formData = new FormData();
    formData.append("file", blob, "data.json");

    // Upload the file to IPFS using the Pinata API
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: apiKey,
          pinata_secret_api_key: apiSecretKey,
        },
      }
    );
    console.log(response.data.IpfsHash);
    const signer = await provider.getSigner();
    let transaction = await devcart
      .connect(signer)
      .buy(response.data.IpfsHash, {
        value: ethers.utils.parseEther(totalPrice.toString()),
      });
    await transaction.wait();
    setLoading(false);
    setCheckout(true);
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(cartTotalReducer(totalPrice));
  }, [totalPrice, dispatch]);

  return (
    <section className={styles.cart_section}>
      {totalItems === 0 ? (
        <div className={styles.empty_cart}>
          <div className={styles.cart_header}>
            <h1>Your Cart is Empty</h1>
            <img src={emptyCart} alt="" />
            <div className={styles.button_section}>
              <Link to="/products">Browse Products</Link>
              <Link to="/myorders">My Orders</Link>
            </div>
          </div>
        </div>
      ) : loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className={styles.cart_header}>
            <h1>Your Cart</h1>
          </div>
          <div className={styles.cart_products}>
            {cartArray.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </div>
          <div className={styles.cart_subtotal}>
            <h2>Subtotal</h2>
            <p>Total Items : {totalItems}</p>
            <p className={styles.cart_price}>
              Total Price : <img src={ethereum} alt="" />
              {totalPrice}
            </p>
            <button onClick={buyHandler}>Proceed to Buy</button>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Cart;
