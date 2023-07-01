import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Products = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const { search } = useLocation();
  const searchTerm = new URLSearchParams(search).get("search");

  useEffect(() => {
    const fetchKeywordData = async () => {
      const response = await fetch(
        keyword === ""
          ? "https://products.cyclic.app/api/v1/product/all"
          : `https://products.cyclic.app/api/v1/product/all?type=${keyword}`
      );
      const data = await response.json();
      setProducts(data.products);
    };
    fetchKeywordData();
  }, [keyword]);
  useEffect(() => {
    const fetchKeywordData = async () => {
      const response = await fetch(
        searchTerm == null
          ? "https://products.cyclic.app/api/v1/product/all"
          : `https://products.cyclic.app/api/v1/product/all?type=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data.products);
    };
    fetchKeywordData();
  }, [searchTerm]);
  return (
    <Fragment>
      {products.length === 0 ? (
        <Loader />
      ) : (
        <section className={styles.products_section}>
          <div className={styles.products_header}>
            <h1>Products</h1>
          </div>
          <div className={styles.filter_section}>
            <div className={styles.products_button}>
              <p>Catagories</p>
              <div>
                <button onClick={() => setKeyword("keyboard")}>Keyboard</button>
                <button onClick={() => setKeyword("mouse")}>Mouse</button>
                <button onClick={() => setKeyword("cooling pad")}>
                  Cooling Pad
                </button>
                <button onClick={() => setKeyword("mousepad")}>
                  Mouse Pad
                </button>
                <button onClick={() => setKeyword("headphones")}>
                  Headphones
                </button>
              </div>
            </div>
            <div className={styles.price_filter}>
              <p>Price</p>
              <p>0 - {priceRange}</p>
              <input
                type="range"
                max={10000}
                min={0}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
            </div>
          </div>
          <div className={styles.products}>
            {products.map((item, index) =>
              item.price < priceRange ? (
                <Link to={`/product/${item._id}`} key={index}>
                  {item.images.slice(0, 1).map((image, index) => (
                    <Fragment key={index}>
                      <img
                        src={image.pic}
                        alt="productImage"
                        className={styles.products_image}
                      />
                    </Fragment>
                  ))}
                  <h1>{item.name}</h1>
                  <p>₹{item.price}</p>
                  <p className={styles.products_stock}>
                    ({item.stock === 0 ? "out of stock" : "in stock"})
                  </p>
                </Link>
              ) : null
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Products;
