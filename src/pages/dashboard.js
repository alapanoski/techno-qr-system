import { useState } from "react";
import { CheckIn, Sidebar } from "../components";
import CustomTitle from "../utils/customTitle";
import styles from "../styles/Dashboard.module.css";
import ProtectedRoute from "../utils/ProtectedRoutes";

function Dashboard() {
  const [tab, setTab] = useState(0);
  return (
    <>
      <CustomTitle title="Dashboard" />
      <div className={styles.container}>
        <Sidebar tab={tab} setTab={setTab} />
        <div className={styles.content}>
          {tab === 0 && <div>Tab 1</div>}
          {tab === 1 && <CheckIn />}
          {tab === 2 && <div>Tab 3</div>}
        </div>
      </div>
    </>
  );
}

export default ProtectedRoute(Dashboard, "volunteer");
