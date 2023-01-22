import React from "react";
import { PacmanLoader } from "react-spinners";
import styles from "./Loader.module.css";
function Loader() {
  return (
    <>
      <div className={styles.loader_container}>
        <PacmanLoader color="#00A1EA" size={30} />
      </div>
    </>
  );
}

export default Loader;
