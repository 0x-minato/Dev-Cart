import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const Search = () => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchRef.current.value}`);
  };
  return (
    <section className={styles.section_search}>
      <form onSubmit={onSearch} className={styles.form}>
        <div className={styles.input}>
          <input type="search" placeholder="search products" ref={searchRef} />
        </div>
        <button type="submit" className={styles.form_button}>
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

export default Search;
