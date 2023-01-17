import Image from "next/image";
import React from "react";
import foodimage from "./image.jpeg";
import styles from "./FoodCard.module.css";
function FoodCard({ food, setFoodTab }) {
  return (
    <div className={styles.food_card}>
      <Image src={foodimage} alt="Food Name" />
      <h2>{food.name}</h2>
      <button
        className={styles.check_in_btn}
        disabled={food.time >= new Date().toISOString() ? false : true}
        onClick={() => setFoodTab(food.id)}
      >
        Check In
      </button>
    </div>
  );
}

export default FoodCard;
