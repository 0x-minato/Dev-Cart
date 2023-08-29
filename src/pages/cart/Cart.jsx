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

const Cart = ({ provider, devcart, setCheckout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartArray = useSelector((state) => state.cart.cartArray);
  const [loading, setLoading] = useState();
  const [boughtItems, setBoughtItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  let items = [];

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
    items = cartArray.map((item, idx) => {
      items.push({
        name: ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes(item.productName)
        ),
        price: ethers.utils.parseEther(item.productPrice.toString()),
        count: ethers.BigNumber.from(item.productRepeat),
      });
    });
  }, [cartArray]);

  const buyHandler = async () => {
    const signer = await provider.getSigner();
    let transaction = await devcart
      .connect(signer)
      .buy(ethers.utils.parseEther(totalPrice.toString()), items, {
        value: ethers.utils.parseEther(totalPrice.toString()),
      });
    setLoading(true);
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
            <Link to="/products">Browse Products</Link>
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
