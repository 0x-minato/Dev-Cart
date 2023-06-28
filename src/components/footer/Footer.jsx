import React from "react";
import DevImg from "../../assets/devimg.png";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <section className={styles.footer_section}>
      <div className={styles.logo_and_title}>
        <img src={DevImg} alt="logo" className={styles.logo} />
        <h1>&lt;DEVCART/&gt;</h1>
      </div>
    </section>
  );
};

export default Footer;
