import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logo from "../../assets/logo.png";
import supabaseClient from "../../utils/supabaseClient";
import styles from "./Sidebar.module.css";
import hamburger from "../../assets/hamburger.svg"

function Sidebar({ tab, setTab }) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(true);
  return (
    <div className={styles.dashboard_menu_container}>
      <div className={styles.dashboard_logo}>
        <Image src={logo} alt="" width={250} height={250} />
        <div className={styles.dashboard_menu_hamburger}>
          <Image className={styles.dashboard_menu_hamburger} src={hamburger} alt="Toggle sidebar" onClick={()=>{
          setExpanded(!expanded)
        }}
        />
        </div>
      </div>
      {expanded && 
      <div className={styles.dashboard_menu}>
        <div
          className={
            tab === 0
              ? styles.dashboard_menu_item_active
              : styles.dashboard_menu_item
          }
          onClick={() => {
            setTab(0);
          }}
        >
          Home
        </div>
        <div
          onClick={() => {
            setTab(1);
          }}
          className={
            tab === 1
              ? styles.dashboard_menu_item_active
              : styles.dashboard_menu_item
          }
        >
          Check In
        </div>
        <div
          className={
            tab === 2
              ? styles.dashboard_menu_item_active
              : styles.dashboard_menu_item
          }
          onClick={() => {
            setTab(2);
          }}
        >
          Food
        </div>
        <div
          className={
            tab === 3
              ? styles.dashboard_menu_item_active
              : styles.dashboard_menu_item
          }
          onClick={() => {
            setTab(3);
          }}
        >
          Add Points
        </div>
        <div
          onClick={() => {
            supabaseClient.auth.signOut().then(() => {
              router.push("/");
            });
          }}
          className={styles.dashboard_menu_item_button}
        >
          Logout
        </div>
      </div>
  }
    </div>
  );
}

export default Sidebar;
