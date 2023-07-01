import React, { useEffect, useState, Fragment } from "react";
import Loader from "../../components/loader/Loader";
import styles from "./styles.module.scss";

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    const fetchFeaturedData = async () => {
      const response = await fetch(
        `https://products.cyclic.app/api/v1/product/all`
      );
      const featuredAPIdata = await response.json();
      setFeatured(featuredAPIdata.products.slice(0, 6));
    };
    fetchFeaturedData();
  }, []);

  return (
    <Fragment>
      {featured.length === 0 ? (
        <Loader />
      ) : (
        <section className={styles.featured_section}>
          <div className={styles.featured_header}>
            <h1>Featured Products</h1>
          </div>
          <div className={styles.featured_products}>
            {featured.map((item, index) => (
              <Fragment key={index}>
                <div className={styles.featured_element}>
                  {item.images.slice(0, 1).map((image, index) => (
                    <Fragment key={index}>
                      <img
                        src={image.pic}
                        alt="productImage"
                        className={styles.featured_image}
                      />
                    </Fragment>
                  ))}
                  <h1>{item.name}</h1>
                  <p>₹{item.price}</p>
                  <p className={styles.featured_stock}>
                    ({item.stock === 0 ? "out of stock" : "in stock"})
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default FeaturedProducts;
