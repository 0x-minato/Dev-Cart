import React from "react";
import styles from "./styles.module.scss";

const About = () => {
  return (
    <section className={styles.about_section}>
      <h1>About DevCart</h1>
      <p>
        Welcome to our website, your one-stop shop for high-quality developer
        equipment! We specialize in providing top-of-the-line keyboards, mice,
        and other accessories that are designed to enhance your coding
        experience and improve your overall productivity. Our team is made up of
        passionate developers who understand the importance of having reliable
        and ergonomic equipment. We believe that having the right tools can make
        all the difference in the world when it comes to coding, which is why
        we've carefully curated our selection of products to ensure that we only
        offer the best. Whether you're a seasoned professional or just starting
        out in the world of coding, we have something for everyone. From
        mechanical keyboards that provide a satisfying typing experience to
        wireless mice that offer unparalleled freedom of movement, our products
        are designed to meet the needs of developers of all skill levels. We
        take pride in our commitment to quality, and we stand behind all of our
        products with a satisfaction guarantee. If for any reason you're not
        completely satisfied with your purchase, we'll do everything we can to
        make it right. Thank you for choosing us as your source for developer
        equipment. We're excited to help you take your coding to the next level!
      </p>
    </section>
  );
};

export default About;
