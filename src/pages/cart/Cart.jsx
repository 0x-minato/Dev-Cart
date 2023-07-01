import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ProductCard from "../../components/productCard/ProductCard";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/emptyCart.png";
import { cartTotalReducer } from "../../redux/cart/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartArray = useSelector((state) => state.cart.cartArray);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    setTotalPrice(0);
    if (cartArray.length > 0) {
      cartArray.map((product, index) => {
        setTotalItems(index + 1);
        setTotalPrice((prev) => prev + product.productTotal);
        return;
      });
    } else {
      setTotalItems(0);
      setTotalPrice(0);
    }
  }, [cartArray]);

  useEffect(() => {
    dispatch(cartTotalReducer(totalPrice));
  }, [totalPrice,dispatch]);

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
            <p>Total Price : ₹{totalPrice}</p>
            <Link to="/checkout">Proceed to Buy</Link>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Cart;
