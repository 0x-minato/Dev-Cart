import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Search from "../../components/search/Search.jsx";
import HorizontalScrollBar from "../../components/swiper/HorizontalScrollBar";
import FeaturedProducts from "../../components/featured/FeaturedProducts.jsx";

const Home = () => {
  return (
    <section className={styles.home_section}>
      <div className={styles.scrollBar}>
        <HorizontalScrollBar />
      </div>
      <div className={styles.title_and_search}>
        <div className={styles.title}>
          <h1>Find the best products for developers....</h1>
        </div>
        <div className={styles.search_section}>
          <Search />
        </div>
        <div className={styles.featured_section}>
          <FeaturedProducts />
        </div>
      </div>
    </section>
  );
};

export default Home;
