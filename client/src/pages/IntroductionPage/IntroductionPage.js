import React from "react";
import logo from "../../assets/images/logo.png";
import ConnectingButtons from "../../components/ConnectingButtons/ConnectingButtons";
import styles from "./IntroductionPage.module.css";

const IntroductionPage = () => {
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
