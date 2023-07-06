import React from "react";
import styles from "./styles.module.scss";
import loginIcon from "../../assets/loginIcon.png";
import Gif from "../../assets/giphy.gif";
import { useNavigate } from "react-router-dom";
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";

const Login = () => {
  const navigate = useNavigate();
  const connect = useAccount({
    onConnect({ address, connecter, isReconnected }) {
      console.log("connected", { address, connecter, isReconnected });
      navigate("/");
    },
  });
  return (
    <section className={styles.login_section}>
      <div className={styles.login_box}>
        <div className={styles.gif}>
          <img src={Gif} alt="" />
        </div>
        <div className={styles.devcart}>
          <h1>DevCart</h1>
          <p>bad keyboard....give us money....get keyboard</p>
        </div>
        <div className={styles.header}>
          <h1>LOGIN</h1>
          <img src={loginIcon} />
        </div>
        <div className={styles.loginButton}>
          <Web3Button />
        </div>
      </div>
    </section>
  );
};

export default Login;
