import { Box, Button, Step, StepButton, Stepper, Typography } from "@mui/material";
import React from "react";
import supabaseClient from "../../utils/supabaseClient";
import Scanner from "../Scanner/Scanner";

const AddPoints = () => {
  const [queryId, setQueryId] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [points, setPoints] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [foodData, setFoodData] = useState([]);
  const steps = ["Verify User ID", "Add Score"];
  const [loading, setLoading] = useState(true);

  const totalSteps = () => {
    return steps.length;
  };
  async function getFoodMenu() {
    const { data, error } = await supabaseClient.from("food_menu").select();
    setFoodData(data);
    setLoading(false);
  }
  useEffect(() => {
    getFoodMenu();
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
        alert("Please enter a valid user id");
      } else {
        const { data, error } = await supabaseClient
          .from("food_log")
          .select()
          .eq("techno_id", userId)
          .eq("food_id", foodData.find((food) => food.id === foodTab).id);
        setFoodEaten(data);
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    }
    if (activeStep === 1) {
      if (foodEaten&&foodEaten.length > 0) {
        alert("User has already checked in for this food");
        setUserId("");
        handleReset();
        setFoodTab(0);
        return;
      } else {
        const { error } = await supabaseClient.from("food_log").insert({
          techno_id: userId,
          food_id: foodData.find((food) => food.id === foodTab).id,
        });
        if (error) {
          console.error(error);
        }
      }

      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
      setUserId("");
      setFoodTab(0);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  async function fetchUser() {
    const { data, error } = await supabaseClient
      .from("users")
      .select()
      .eq("techno_id", queryId);
    if (error) console.log(error);
    setCurrentUser(data[0]);
  }

  async function addPoints() {
    console.log(points);
    setCurrentUser({
      ...currentUser,
      points: parseInt(currentUser.points) + parseInt(points),
    });
    console.log(currentUser);
  }
  async function reducePoints() {
    console.log(points);
    setCurrentUser({
      ...currentUser,
      points: parseInt(currentUser.points) - parseInt(points),
    });
    console.log(currentUser);
  }

  async function updatePoints() {
    const { data, error } = await supabaseClient
      .from("users")
      .update(currentUser)
      .eq("techno_id", currentUser.techno_id);
    console.log(error);
  }

  return (
    <>
      {/* <input
        type="text"
        name="techno_id"
        placeholder="techno id"
        onChange={(e) => {
          setQueryId(e.target.value);
        }}
      />
      <button onClick={fetchUser}>Fetch</button>
      {currentUser && (
        <div>
          <p>{currentUser.name}</p>
          <p>{currentUser.points}</p>
          <input
            type="number"
            name="points"
            placeholder="points"
            onChange={(e) => {
              setPoints(e.target.value);
            }}
          />
          <button onClick={addPoints}>Add</button>
          <button onClick={reducePoints}>Reduce</button>
          <button onClick={updatePoints}>Update</button>
        </div>
      )} */}
      
      <div className={styles.food_container}>
      <div className={styles.food_heading}>Points</div>
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
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 ? (
                    <Scanner
                      setUserId={setUserId}
                      qr_pay={false}
                      userId={userId}
                    />
                  ) : activeStep === 1 ? (
                    
                      <div className={styles.confirm}>
                        <div>
                          Techno ID: <b>{userId}</b>
                        </div>
                        <div>
                          Points: <b>10</b>
                        </div>
                      </div>
                    
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
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <div className={styles.button} onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </div>
                      ))}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
    </div>
    </>
  );
};

export default AddPoints;
