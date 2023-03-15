import { useState } from "react";
import { AddPoints, CheckIn, Food, Home, Sidebar } from "../components";
import styles from "../styles/Dashboard.module.css";
import Image from "next/image";
import logo from "../assets/logo.png";
import { CustomTitle, ProtectedRoute } from "../utils";

function Dashboard() {
  const [tab, setTab] = useState(0);
  return (
    <>
      <CustomTitle title="Dashboard" />
      <div className={styles.container}>
        <Sidebar tab={tab} setTab={setTab} />
        <div className={styles.content}>
          {tab === 0 && <Home/>}
          {tab === 1 && <CheckIn />}
          {tab === 2 && <Food />}
          {tab === 3 && <AddPoints />}
        </div>
      </div>
    </>
  );
}

export default ProtectedRoute(Dashboard, "volunteer");
