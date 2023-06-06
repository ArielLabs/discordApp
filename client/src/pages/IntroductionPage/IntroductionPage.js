import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connectWithSocketIOServer } from "../../utils/wss";
import logo from "../../assets/images/logo.png";
import ConnectingButtons from "../../components/ConnectingButtons/ConnectingButtons";
import styles from "./IntroductionPage.module.css";

const IntroductionPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    connectWithSocketIOServer(dispatch);
  }, [dispatch]);
  
  return (
    <div className={styles.introduction}>
      <div className={styles.panelIntroduction}>
        <img src={logo} alt="logo" className={styles.logo} />
        <ConnectingButtons />
      </div>
    </div>
  );
};

export default IntroductionPage;