import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import ethereum from "../../assets/ethereum.png";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Checkout = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  return (
    <section className={styles.checkout}>
      {totalPrice > 0 ? (
        <Fragment>
          <h1>Thank you for your order</h1>
          <p>
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
