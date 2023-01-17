import { Scanner } from "..";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./CheckIn.module.css";
import React, { useEffect } from "react";
import supabaseClient from "../../utils/supabaseClient";

const steps = ["Verify Payment Details", "Assign User ID", "Confirm User"];

const CheckIn = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [paymentId, setPaymentId] = React.useState("");
  const [userId, setUserId] = React.useState("");

  async function fetchUsers() {
    console.log("Supabase Client : ", supabaseClient);
    const { data, error } = await supabaseClient.from("users").select();
    console.log(error);
    setUsers(data);
    console.log(data);
    console.log(users);
  }
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const totalSteps = () => {
    return steps.length;
  };

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
      if (!paymentId) {
        alert("Please enter a valid payment id");
      } else {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    }
    if (activeStep === 1) {
      if (users.filter((user) => user.techno_id === userId).length > 0) {
        alert("User already exists");
      } else if (!userId) {
        alert("Please enter a valid user id");
      } else {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    }
    if (activeStep === 2) {
      const { error } = await supabaseClient
        .from("users")
        .update({ techno_id: userId })
        .eq("payment_id", paymentId);
      if (error) {
        console.error(error);
      }
      setPaymentId("");
      setUserId("");
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  return (
    <>
      <div className={styles.heading}>Check In Page</div>
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
                  setPaymentId={setPaymentId}
                  qr_pay={true}
                  paymentId={paymentId}
                />
              ) : activeStep === 1 ? (
                <Scanner
                  setUserId={setUserId}
                  qr_pay={false}
                  userId={userId}
                  paymentId={paymentId}
                />
              ) : activeStep === 2 ? (
                <div className={styles.confirm}>
                  <div>
                    Payment ID: <b>{paymentId}</b>
                  </div>
                  <div>
                    Techno ID: <b>{userId}</b>
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
    </>
  );
};

export default CheckIn;
