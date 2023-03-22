import { useEffect, useState } from "react";
import { AddPoints, CheckIn, Food, Home, Sidebar } from "../components";
import styles from "../styles/Dashboard.module.css";
import Image from "next/image";
import logo from "../assets/logo.png";
import { CustomTitle, ProtectedRoute } from "../utils";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  const { id } = router.query;
  async function getFoodLogById(id) {
    console.log(id);
  }
  useEffect(() => {
    getFoodLogById(id);
  }, []);
  const [tab, setTab] = useState(0);
  return (
    <>
      <CustomTitle title="Dashboard" />
      <div className={styles.container}>
        <Sidebar tab={tab} setTab={setTab} />
        <div className={styles.content}>
          {tab === 0 && <Home />}
          {tab === 1 && <CheckIn />}
          {id}
          {tab === 2 && <Food />}
          {tab === 3 && <AddPoints />}
        </div>
      </div>
    </>
  );
}

export default ProtectedRoute(Dashboard, "volunteer");
