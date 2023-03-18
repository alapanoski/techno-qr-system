import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Loader } from "../../components";
import styles from "../../components/Food/FoodCard/FoodCard.module.css";
import { SupabaseClient } from "../../utils";

function Food() {
  const router = useRouter();
  const [foodMenu, setFoodMenu] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getFoods = async () => {
    setLoading(true);
    const response = await SupabaseClient.from("food_menu").select("*");
    console.log(response.data);
    setFoodMenu(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getFoods();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2rem",
        gap: "2rem",
        minHeight: "100vh",
        padding: "2rem",
    }}>
        <div style={{
            fontSize: "2rem",
            fontWeight: "700",
        }}>
            Food Menu
        </div>
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
        }}>
      {foodMenu.map((food) => {
        return <>
          <div className={styles.food_card} key={
                food.id
          }>
            <Image
              src={food.image ? food.image : foodimage}
              alt="Food Name"
              width={250}
              height={150}
              className={styles.food_card_img}
            />
            <div className={styles.food_card_title}>{food.name}</div>
            <div
              className={styles.check_in_btn}
              onClick={() => router.push(`/food/${food.id}`)}
            >
              View Details
            </div>
          </div>
        </>;
      })}
      </div>
    </div>
  );
}

export default Food;
