import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";
import ethereum from "../../assets/ethereum.png";

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const [orderNo, setOrderNo] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setOrder(location.state?.currOrder || []);
    setOrderNo(location.state?.orderNo || null);
    if (location.state?.orderNo == null) {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    getTotalPrice();
  }, []);

  const getTotalPrice = () => {
    let orderTotal = 0;
    location.state?.currOrder.map((item) => {
      orderTotal += item.productTotal;
    });
    setOrderTotal(orderTotal);
  };

  return (
    <section className={styles.order_section}>
      <div className={styles.order_header}>
        <h1>Order {orderNo}</h1>
      </div>
      <div className={styles.order_products}>
        {order.map((product, index) => {
          return <ProductCard key={index} product={product} checkout={true} />;
        })}
      </div>
      <div className={styles.order_subtotal}>
        <h2>Subtotal</h2>
        <p>Total Items : {order.length}</p>
        <p>Order Date : {}</p>
        <p className={styles.order_price}>
          Total Price : <img src={ethereum} alt="" />
          {orderTotal}
        </p>
      </div>
    </section>
  );
};

export default OrderDetails;
