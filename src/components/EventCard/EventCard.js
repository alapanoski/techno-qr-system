import React from "react";
import Image from "next/image";
import styles from "./EventCard.module.css";
import { useRouter } from "next/router";

const EventCard = ({ id, eventname }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className={styles.food_card}>
        {/* <Image
          src={food.image ? food.image : foodimage}
          alt="Food Name"
          width={250}
          height={150}
          className={styles.food_card_img}
        /> */}
        <div className={styles.food_card_title}>{eventname}</div>
        <div className={styles.food_card_title}>ID: {id}</div>
        <div className={styles.check_in_btn}  onClick={() => router.push(`/${id}`)}>
          Check In
        </div>
      </div>
    </div>
  );
};

export default EventCard;
