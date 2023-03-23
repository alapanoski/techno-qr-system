import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FoodCard from "./FoodCard/FoodCard";
import styles from "./Food.module.css";
import supabaseClient from "../../utils/SupabaseClient";
import Scanner from "../Scanner/Scanner";
import { Box } from "@mui/system";
import {
  Button,
  CircularProgress,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { toast } from "react-hot-toast";

function Food() {

  const router = useRouter()
  
  const [foodTab, setFoodTab] = React.useState(0);
  const [users, setUsers] = useState([]);
  const [registerList, setRegisterList] = React.useState([]);
  const [userId, setUserId] = useState("");
  const [foodEaten, setFoodEaten] = useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [foodData, setFoodData] = useState([]);
  const steps = ["Verify User ID", "Log food"];
  const [loading, setLoading] = useState(true);
  const {id} = router.query

  const totalSteps = () => {
    return steps.length;
  };
  async function getFoodMenu() {
    const { data, error } = await supabaseClient.from("food_menu").select();
    console.log(data)
    setFoodData(data);
    setLoading(false);
  }
  async function getUsers() {
    const { data, error } = await supabaseClient.from("users").select();
    setUsers(data);
    setLoading(false);
  }
  async function fetchRegisterList() {
    const { data, error } = await supabaseClient.from("register").select();
    //console.log(error);
    console.log(data);
    setRegisterList(data);
  }
  useEffect(() => {
    getFoodMenu();
    getUsers();
    fetchRegisterList();
  }, []);
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = async () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = async () => {
    if (activeStep === 0) {
      if (!userId) {
        toast.error("Please enter a valid user id");
      } else {
        if (registerList.find((registerEntry) => registerEntry.band_id === userId) === undefined) {
          toast.error("User does not exist");
          setUserId("");
          return;
        }
        const { data, error } = await supabaseClient
          .from("food_log")
          .select()
          .eq("user_id", registerList.find((registerEntry) => registerEntry.band_id === userId).user_id)
          .eq("food_id", foodData.find((food) => food.id === foodTab).id)
          .eq("event_id", id);
          console.log({error, data})
        setFoodEaten(data);
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    }
    // if (activeStep === 1) {
    //   if (foodEaten && foodEaten.length > 0) {
    //     toast.error("User has already checked in for this food");
    //     setUserId("");
    //     handleReset();
    //     setFoodTab(0);
    //     return;
    //   } else {
    //     const { error } = await supabaseClient.from("food_log").insert({
    //       techno_id: userId,
    //       food_id: foodData.find((food) => food.id === foodTab).id,
    //     });
    //     if (error) {
    //       console.error(error);
    //     }
    //   }

    //   const newCompleted = completed;
    //   newCompleted[activeStep] = true;
    //   setCompleted(newCompleted);
    //   handleNext();
    //   setUserId("");
    //   setFoodTab(0);
    // }
  };

  const handleReset = async () => {
    if (foodEaten && foodEaten.length > 0) {
      toast.error("User has already been logged");
      setUserId("");
      setFoodTab(0);
    } else {
      const { error } = await supabaseClient.from("food_log").insert({
        user_id: registerList.find((registerEntry) => registerEntry.band_id === userId).user_id,
        food_id: foodData.find((food) => food.id === foodTab).id,
        event_id: id
      });
      if (error) {
        console.error(error);
        toast.error("Supabase error");
        return;
      }
      toast.success("User logged for food successfully")
      setActiveStep(0);
      setFoodTab(0);
    }
    setUserId("");
    setActiveStep(0);
    setCompleted({});
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div className={styles.food_container}>
      <div className={styles.food_heading}>Food</div>
      {foodTab == 0 && (
        <div className={styles.food_cards_container}>
          {foodData?.map((food, index) => (
            <FoodCard
              key={food.id}
              food={food}
              foodTab={foodTab}
              setFoodTab={setFoodTab}
            />
          ))}
        </div>
      )}
      {foodTab != 0 && (
        <div>
          <div className={styles.food_heading}>
            {foodData.find((food) => food.id == foodTab).name}
          </div>
          <Box className={styles.box}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton
                    color="inherit"
                    onClick={
                      activeStep === 0
                        ? handleComplete
                        : activeStep === 1
                        ? handleComplete
                        : activeStep === 2
                        ? handleComplete
                        : handleStep(index)
                    }
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                ""
              ) : (
                // <React.Fragment>
                //   <Typography sx={{ mt: 2, mb: 1 }}>
                //     All steps completed - you&apos;re finished
                //   </Typography>
                //   <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                //     <Box sx={{ flex: "1 1 auto" }} />
                //     <Button onClick={handleReset}>Reset</Button>
                //   </Box>
                // </React.Fragment>
                <React.Fragment>
                  {activeStep === 0 ? (
                    <Scanner
                      setUserId={setUserId}
                      qr_pay={false}
                      userId={userId}
                    />
                  ) : activeStep === 1 ? (
                    foodEaten && foodEaten.length > 0 ? (
                      <div className={styles.confirm}>
                        Food already checked in at{" "}
                        <b>
                          {new Date(
                            foodEaten[0].created_at
                          ).toLocaleDateString()}
                          {" , "}
                          {new Date(foodEaten[0].created_at).toLocaleString(
                            "en-US",
                            { hour: "numeric", minute: "numeric", hour12: true }
                          )}
                        </b>{" "}
                        for Techno ID: <b>{userId}</b>
                      </div>
                    ) : (
                      <div className={styles.confirm}>
                        <div>
                          Techno ID: <b>{userId}</b>
                        </div>
                        <div>
                          Food:{" "}
                          <b>
                            {foodData.find((food) => food.id === foodTab).name}
                          </b>
                        </div>
                      </div>
                    )
                  ) : (
                    <div>Something went wrong</div>
                  )}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {/* {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : ( */}
                    <div
                      className={styles.button}
                      onClick={
                        completedSteps() === totalSteps() - 1
                          ? handleReset
                          : handleComplete
                      }
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Next Step"}
                    </div>
                    {/* ))} */}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </div>
      )}
    </div>
  );
}
export default Food;
