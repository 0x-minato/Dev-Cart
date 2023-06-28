import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import { useDispatch } from "react-redux";
import { cartReducer, cartTotalReducer } from "../../redux/cart/CartSlice";
import Loader from "../../components/loader/Loader";

const ProductDescription = () => {
  const [productData, setProductData] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const { productId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductInfo = async () => {
      const response = await fetch(
        `https://products.cyclic.app/api/v1/product/${productId}`
      );
      const data = await response.json();
      setProductData(data.product);
    };
    fetchProductInfo();
  }, []);

  useEffect(() => {
    setSubtotal(productData.price * numberOfItems);
  }, [numberOfItems, productData.price]);

  const incrementItems = () => {
    setNumberOfItems((prev) => prev + 1);
  };
  const decrementItems = () => {
    if (numberOfItems == 1) {
      return;
    }
    setNumberOfItems((prev) => prev - 1);
  };
  const addToCart = () => {
    dispatch(cartReducer(productArray));
  };
  const productArray = {
    productName: productData.name,
    productPrice: productData.price,
    productImage: productData.images,
    productId: productData._id,
    productTotal: subtotal,
    productRepeat: numberOfItems,
  };
  return (
    <Fragment>
      {productData.length == 0 ? (
        <Loader />
      ) : (
        <section className={styles.product_description}>
          <div className={styles.swiper_section}>
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[EffectFade, Navigation, Pagination, Autoplay]}
              className={styles.swiper}
            >
              {productData.images != undefined &&
                productData.images.map((item, index) => (
                  <SwiperSlide className={styles.swiperSlide} key={index}>
                    <img src={item.pic} alt="" />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className={styles.info_section}>
            <div className={styles.header_section}>
              <h1>{productData.name}</h1>
              <p className={styles.product_price}>
                Price : ₹{productData.price}
              </p>
              <p className={styles.featured_stock}>
                (
                {productData.stock == 0 || numberOfItems > productData.stock
                  ? "out of stock"
                  : "in stock"}
                )
              </p>
            </div>
            <div className={styles.cart_section}>
              <button onClick={decrementItems} className={styles.cart_button}>
                -
              </button>
              <input
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
            <div className={styles.add_to_cart}>
              <button onClick={addToCart}>Add to Cart</button>
            </div>
            <div className={styles.description}>
              <p>{productData.description}</p>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default ProductDescription;
