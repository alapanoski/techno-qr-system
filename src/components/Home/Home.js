import Image from "next/image";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../../styles/Home.module.css";
import logo from "../../assets/logo.png";
import { SupabaseClient } from "../../utils";
import { Autocomplete, TextField } from "@mui/material";

function Home() {
  const [name, setName] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [registerList, setRegisterList] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState("Not Found");
  // const [currentUserFood, setCurrentUserFood] = React.useState([]);
  const [foodMenu, setFoodMenu] = React.useState([]);
  const [foodLog, setFoodLog] = React.useState([]);
  const [loading1, setLoading1] = React.useState(false);

  async function getUsers() {
    setLoading1(true);
    const data = await SupabaseClient.from("users").select("*");
    setUsers(data.data);
    setLoading1(false);
    console.log(users);
  }

  async function getRegisterList() {
    setLoading1(true);
    const data = await SupabaseClient.from("register").select("*");
    setLoading1(false)
    console.log(registerList)
  }


  async function getFoods() {
    setLoading1(true);
    const data = await SupabaseClient.from("food_menu").select("*").order("id");
    setFoodMenu(data.data);
    setLoading1(false);
  }

  async function getFoodLog() {
    setLoading1(true);
    const data = await SupabaseClient.from("food_log").select("*");
    setFoodLog(data.data);
    setLoading1(false);
  }

  async function getID(value) {
    setLoading1(true);
    console.log(value)
    setCurrentUser(value);  
    // if (value?.band_id) {
    //   registerList.forEach(async (registerEntry) => {
    //     if (registerEntry.name === value.name) {
    //       setCurrentUser(registerEntry);
    //     }
    //   });
    // } else {
    //   setCurrentUser("Not Found");
    // }

    setName("");
    setLoading1(false);
  }

  useEffect(() => {
    getUsers();
    getRegisterList();
    getFoods();
    getFoodLog();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <Image src={logo} alt="" width={300} />
        <h2
          style={{
            color: "#041c2b",
          }}
        >
          FIND TECHNO ID
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* <input
            type="text"
            placeholder="Enter Name"
            style={{
              border: "1px solid #041c2b",
            }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          /> */}
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={name}
            onChange={(event, newValue) => {
              getID(newValue);
            }}
            options={users}
            getOptionLabel={(option) => option.name || ""}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter Name" />
            )}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
            
              <p>
                Name: <strong>{currentUser.name}</strong>
              </p>
              <p>{JSON.stringify(currentUser)}</p>
              <p>Technical Workshop: <strong>{currentUser.technical_workshop_topic}</strong></p>
              <p>Non Technical Workshop: <strong>{currentUser.non_technical_workshop_topic}</strong></p>
              <p>Ticket Number: <strong>{currentUser.ticket_number}</strong></p>
              <p  style={{
                width: "100%",
                fontSize: "1.3rem",
                fontWeight: "bold",
                textAlign: "center",
                padding: "1rem 0",
              }}>Food Details</p>
              {foodMenu.map((food, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>{food.name}</p>{" "}
                    <b>
                      {foodLog.filter(
                        (log) =>
                          log.food_id === food.id &&
                          log.user_id === currentUser.id
                      ).length > 0
                        ? new Date(
                            foodLog.filter(
                              (log) =>
                                log.food_id === food.id &&
                                log.user_id === currentUser.id
                            )[0].created_at
                          ).toLocaleDateString() +
                          ", " +
                          new Date(
                            foodLog.filter(
                              (log) =>
                                log.food_id === food.id &&
                                log.user_id === currentUser.id
                            )[0].created_at
                          ).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })
                        : "Not Taken"}
                    </b>
                  </div>
                );
              })}

              {/* <p>{JSON.stringify(currentUserFood)}</p> */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* {foodMenu.map((food, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{food.name}</p>
                        <p>{food.time}</p>
                      </div>
                    );
                })} */}
              </div>
              {/* <p>{currentUser.email}</p>
              <p>{currentUser.phone}</p>
              <p>{currentUser.github}</p>
              <p>{currentUser.devfolio}</p>
              <p>{currentUser.linkedin}</p>
              <p>{currentUser.organization}</p>
              <p>{currentUser.grad_year}</p> */}
        </div>
      </div>

      {/* <div style={{ width: "100%" }}>
        {users.map((user, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "50px",
                border: "1px solid gray",
                padding: "0 1rem",
              }}
            >
              <p>{user.name}</p>
              <p>{user.techno_id}</p>
            </div>
          );
        })}
      </div> */}
    </>
  );
}

export default Home;
