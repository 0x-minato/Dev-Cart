import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useAccount } from "wagmi";
import emptyCart from "../../assets/emptyCart.png";
import Loader from "../../components/loader/Loader";
import ethereum from "../../assets/ethereum.png";
import axios from "axios";
import { Link } from "react-router-dom";

const MyOrders = ({ devcart }) => {
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
  const accountDetails = useAccount();
  useEffect(() => {
    if (devcart) {
      getOrderData();
    }
  }, [devcart]);

  const getOrderData = async () => {
    setLoader(true);
    let count = await devcart.orderCount(accountDetails.address);
    setOrderCount(count);
    const currOrders = [];
    const CIDS = await devcart.getCIDs(accountDetails.address);
    for (let i = 0; i < parseInt(count, 16); i++) {
      const response = await axios.get(`https://ipfs.io/ipfs/${CIDS[i]}`);
      currOrders.push(response.data);
    }
    setOrders(currOrders);
    setLoader(false);
  };

  const getOrderTotal = (order) => {
    let total = 0;
    order.map((item) => {
      total += item.productTotal;
    });
    return total;
  };

  return (
    <section className={styles.orders_section}>
      {loader ? (
        <Loader />
      ) : orderCount == 0 ? (
        <div className={styles.empty_order}>
          <div className={styles.order_header}>
            <h1>You have no Orders</h1>
            <img src={emptyCart} alt="" />
            <Link to="/products">Browse Products</Link>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className={styles.order_header}>
            <h1>Your Orders</h1>
            <h3>Total Orders : {parseInt(orderCount, 16)}</h3>
          </div>
          <div className={styles.total_orders}>
            {orders.map((currOrder, index) => {
              return (
                <div key={index} className={styles.current_order}>
                  <div className={styles.current_header}>
                    <h1>Order {index + 1}</h1>
                  </div>
                  <div className={styles.order_details}>
                    <div className={styles.items}>
                      <h3> Number of Items : {currOrder.length}</h3>
                    </div>
                    <div className={styles.order_date}>
                      <h3>Order Date : {}</h3>
                    </div>
                  </div>
                  <div className={styles.border_line}></div>
                  <div className={styles.order_total}>
                    <p>
                      Order Total : <img src={ethereum} alt="ethereum" />{" "}
                      {getOrderTotal(currOrder)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default MyOrders;
