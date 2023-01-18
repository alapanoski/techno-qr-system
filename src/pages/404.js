import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logo from "../assets/logo.png";
import styles from "../styles/Error.module.css";
import { CustomTitle } from "../utils";
function Error() {
  const router = useRouter();
  return (
    <>
      <CustomTitle title="Page Not Found" />
      <div className={styles.error_container}>
        <Image src={logo} alt="" />
        <div className={styles.error_details}>
          <div className={styles.error_details_404}>404</div>
          <div className={styles.error_details_content}>Page Not Found</div>
        </div>
        <div
          className={styles.error_details_button}
          onClick={() => router.push("/users")}
        >
          Go to Home
        </div>
      </div>
    </>
  );
}

export default Error;
