import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logo from "../../assets/logo.png";
import styles from "./Sidebar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { SupabaseClient } from "../../utils";

function Sidebar({ tab, setTab }) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className={styles.dashboard_menu_container}>
      <div className={styles.dashboard_logo}>
        <Image
          src={logo}
          alt=""
          width={200}
          onClick={() => {
            setTab(0);
          }}
        />
        <div className={styles.dashboard_menu_hamburger}>
          <GiHamburgerMenu
            size={30}
            onClick={() => {
              setExpanded(!expanded);
            }}
          />
        </div>
      </div>
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
            SupabaseClient.auth.signOut().then(() => {
              router.push("/");
            });
          }}
          className={styles.dashboard_menu_item_button}
        >
          Logout
        </div>
      </div>
      {expanded && (
        <div className={styles.dashboard_menu_mobile}>
          <div
            className={
              tab === 0
                ? styles.dashboard_menu_item_active
                : styles.dashboard_menu_item
            }
            onClick={() => {
              setTab(0);
              setExpanded(false);
            }}
          >
            Home
          </div>
          <div
            onClick={() => {
              setTab(1);
              setExpanded(false);
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
              setExpanded(false);
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
              setExpanded(false);
            }}
          >
            Add Points
          </div>
          <div
            onClick={() => {
              SupabaseClient.auth.signOut().then(() => {
                router.push("/");
              });
            }}
            className={styles.dashboard_menu_item_button_mobile}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
