import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ethereum from "../../assets/ethereum.png";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { emptyCartReducer } from "../../redux/cart/CartSlice";
import { checkoutReducer } from "../../redux/cart/CartSlice";
import ProductCard from "../../components/productCard/ProductCard";

const Checkout = ({ checkout }) => {
  const checkoutArray = useSelector((state) => state.cart.checkoutArray);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartArray = useSelector((state) => state.cart.cartArray);
  const dispatch = useDispatch();
  useEffect(() => {
    if (checkout) {
      dispatch(checkoutReducer(cartArray));
      dispatch(emptyCartReducer([]));
    }
  }, []);

  return (
    <section className={styles.checkout}>
      {checkout ? (
        <Fragment>
          <h1>Thank you for your order</h1>
          <div className={styles.current_order}>
            {checkoutArray.map((product, index) => {
              return (
                <ProductCard key={index} product={product} checkout={true} />
              );
            })}
          </div>
          <p className={styles.eth_total}>
            Total : <img src={ethereum} alt="" />
            {totalPrice}
          </p>
        </Fragment>
      ) : (
        <Navigate to="/cart" />
      )}
    </section>
  );
};

export default Checkout;
