import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default RootLayout;
