import React from "react";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import logo from "../assets/logo.png";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { Loader } from "../components";
import { ClipLoader } from "react-spinners";
import { CustomTitle, SupabaseClient } from "../utils";

import axios from "axios";
import { toast } from "react-hot-toast";
import FoodCard from "../components/Food/FoodCard/FoodCard";
import { style } from "@mui/system";
import EventCard from "../components/EventCard/EventCard";

export default function Home() {
  const router = useRouter();
  const { User, setUser, loading } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [browser, setBrowser] = useState(false);
  const [eventTab, setEventTab] = useState("");
  // const [browser, setBrowser] = useState(false);
  const [password, setPassword] = useState("");
  const [foodTab, setFoodTab] = React.useState(0);
  const [loading2, setLoading2] = useState(false);
  const [pageid, setPageid] = useState("");

  // useEffect(() => {
  //   if (User) {
  //     router.push("/dashboard");
  //   }
  //   // console.log(User);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [User]);

  // useEffect(() => {
  //   if (navigator.userAgent.indexOf("Chrome") === -1) {
  //     setBrowser(true);
  //   }
  // }, []);

  async function signInWithAltPassword() {
    //console.log("clicked");
    const { data, error } = await SupabaseClient.auth.signInWithPassword({
      email: "iedcmec@mec.ac.in",
      password: password,
    });
    setUser(data?.user);

    if (error?.__isAuthError == true) {
      toast.error("Incorrect password");
    }

    setPassword("");
  }

  async function getEvents() {
    const { data, error } = await SupabaseClient.from("event_list").select();
    setEvents(data);
    console.log(data);
  }
  useEffect(() => {
    getEvents();
  }, []);

  // async function signInWithGoogle() {
  //   setLoading1(true);
  //   const { data, error } = await SupabaseClient.auth.signInWithOAuth({
  //     provider: "google",
  //   });
  // }
  if (loading) return <Loader />;
  // if (browser)
  //   return (
  //     <>
  //       <CustomTitle title="Login" />
  //       <div className={styles.login_container}>
  //         <Image src={logo} alt="" width={300} />
  //         <div className={styles.login_warning}>
  //           Please use Google Chrome to use this website.
  //         </div>
  //       </div>
  //     </>
  //   );
  return (
    <>
      <CustomTitle title="Login" />
      <div className={styles.login_container}>
        <Image src={logo} alt="" width={300} />

        <div className={styles.login_form}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div
            onClick={signInWithAltPassword}
            className={styles.login_button}
            style={{
              cursor: "pointer",
            }}
          >
            Submit
          </div>
        </div>
        {User ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "center",
              }}
            >
              {events?.map((food) => (
                <EventCard
                  key={food.id}
                  id={food.id}
                  eventname={food.event_name}
                  setEventTab={setEventTab}
                />
              ))}
            </div>
            <p>Event Selected : {eventTab}</p>
          </>
        ) : (
          <></>
        )}

        {/* <h2
          style={{
            color: "white",
          }}
        >
          OR
        </h2>
        <div
          className={styles.login_button}
          variant="contained"
          onClick={signInWithGoogle}
        >
          {loading1 ? <ClipLoader /> : "Login with Google"}
        </div> */}
      </div>
    </>
  );
}
