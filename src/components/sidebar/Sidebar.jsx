import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { ImHome3 } from "react-icons/im";
import { IoCart } from "react-icons/io5";
import { IoBookSharp } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Web3Button } from "@web3modal/react";

const Sidebar = ({ sidebar, setSidebar }) => {
  const cartArray = useSelector((state) => state.cart.cartArray);
  const [totalCartItems, setTotalCartItems] = useState(cartArray.length);
  const { pathname } = useLocation();
  useEffect(() => {
    setTotalCartItems(cartArray.length);
  }, [cartArray.length]);
  const links = [
    { title: "HOME", path: "/", image: <ImHome3 /> },
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
    {
      title: "CONNECT",
    },
  ];
  return (
    <aside className={styles.sidebar_section}>
      <div className={styles.sidebar_icon}>
        <RxCross2 onClick={() => setSidebar(!sidebar)} />
      </div>
      <div className={styles.sidebar_links}>
        {links.map((link, idx) =>
          link.title == "CONNECT" ? (
            <Web3Button />
          ) : (
            <Link
              onClick={() => setSidebar(!sidebar)}
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
          )
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
