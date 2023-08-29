import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useAccount } from "wagmi";

const MyOrders = ({ devcart }) => {
  const [orderCount, setOrderCount] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const accountDetails = useAccount();
  useEffect(() => {
    if (devcart) {
      getOrderData();
    }
  }, [devcart]);

  const getOrderData = async () => {
    let count = await devcart.getOrderCount();
    let data = await devcart.getTotalOrders();
    setOrderCount(parseInt(count, 16));
    setOrderData(data);
  };

  console.log(orderCount);
  console.log(orderData);

  return <section className={styles.my_orders}></section>;
};

export default MyOrders;
