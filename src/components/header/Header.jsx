import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import DevImg from "../../assets/devimg.png";
import { useLocation } from "react-router-dom";
import { BsListNested } from "react-icons/bs";
import { ImHome3 } from "react-icons/im";
import { IoCart } from "react-icons/io5";
import { IoBookSharp } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar.jsx";

const Header = () => {
  const cartArray = useSelector((state) => state.cart.cartArray);
  const [sidebar, setSidebar] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(cartArray.length);
  const { pathname } = useLocation();
  useEffect(() => {
    setTotalCartItems(cartArray.length);
  }, [cartArray.length]);
  const links = [
    { title: "HOME", path: "/", image: <ImHome3 /> },
    {
      title: "ABOUT",
      path: "/about",
      image: <IoBookSharp />,
    },
    {
      title: "CART",
      path: "/cart",
      image: <IoCart />,
      update: (
        <div
          className={
            totalCartItems > 0 ? styles.update_visible : styles.update_hidden
          }
        >
          {totalCartItems}
        </div>
      ),
    },
    {
      title: "PRODUCTS",
      path: "/products",
      image: <HiShoppingBag />,
    },
  ];
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <nav className={styles.header}>
        <div className={styles.logo_and_links}>
          <Link to="/" title="Go to Home">
            <div className={styles.logo_and_title}>
              <img src={DevImg} alt="logo" className={styles.logo} />
              <h1>&lt;DEVCART/&gt;</h1>
            </div>
          </Link>
          <div className={styles.links_container}>
            {links.map((link, idx) => (
              <Link
                to={link.path}
                key={idx}
                title={`go to ${link.title}`}
                className={`${styles.links} ${
                  link.path === pathname ? styles.active : ""
                }`}
              >
                {link.title}
                <div className={styles.link_image}>{link.image}</div>
                {link.update}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.mobileLogo}>
          <BsListNested onClick={showSidebar} />
        </div>
      </nav>
      <nav className={sidebar ? styles.sidebar_active : styles.sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      </nav>
    </>
  );
};

export default Header;
