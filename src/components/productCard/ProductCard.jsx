import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  productCardReducer,
  productDelete,
  productTotalReducer,
} from "../../redux/cart/CartSlice";
import ethereum from "../../assets/ethereum.png";

const ProductCard = ({ product, checkout }) => {
  const cartArray = useSelector((state) => state.cart.cartArray);
  const dispatch = useDispatch();
  const [numberOfItems, setNumberOfItems] = useState(product.productRepeat);
  const [subtotal, setSubtotal] = useState(product.productTotal);
  useEffect(() => {
    dispatch(productTotalReducer([product.productId, subtotal]));
  }, [subtotal, dispatch, product.productId]);
  useEffect(() => {
    setSubtotal(numberOfItems * product.productPrice);
  }, [numberOfItems, dispatch, product.productPrice]);
  const incrementItems = () => {
    setNumberOfItems((prev) => prev + 1);
    dispatch(productCardReducer([product.productId, 1]));
  };
  const decrementItems = () => {
    if (numberOfItems === 1) {
      return;
    }
    setNumberOfItems((prev) => prev - 1);
    dispatch(productCardReducer([product.productId, -1]));
  };
  const removeProduct = () => {
    dispatch(productDelete(cartArray.indexOf(product)));
  };
  return (
    <section className={styles.card_section}>
      <div className={styles.product_card}>
        <img
          src={product.productImage[0].pic}
          alt="productImage"
          className={styles.product_image}
        />
        <h2>{product.productName}</h2>
        <p className={styles.product_price}>
          <img src={ethereum} alt="" />
          {product.productPrice}
        </p>
        <div className={checkout ? styles.display : styles.cart_section}>
          <button onClick={decrementItems} className={styles.cart_button}>
            -
          </button>
          <input
            className={styles.input}
            type="text"
            name="numberOfItems"
            id="numberOfItems"
            value={numberOfItems}
            disabled={true}
          />
          <button onClick={incrementItems} className={styles.cart_button}>
            +
          </button>
        </div>
        <button
          className={checkout ? styles.display : ""}
          onClick={removeProduct}
        >
          Remove from cart
        </button>
      </div>
      <div className={styles.border_line}></div>
      <p className={styles.subtotal}>
        Subtotal ({numberOfItems} items) : <img src={ethereum} />
        {subtotal}
      </p>
    </section>
  );
};

export default ProductCard;
