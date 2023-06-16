import Image from "next/image";
import React from "react";
import foodimage from "./image.jpeg";
import styles from "./FoodCard.module.css";
function FoodCard({ food, setFoodTab }) {
  return (
    <div className={styles.food_card}>
      <div className={styles.food_card_title}>{food.name}</div>
      <div className={styles.check_in_btn} onClick={() => setFoodTab(food.id)}>
        Check In
      </div>
    </div>
  );
}

export default FoodCard;
