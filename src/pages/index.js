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

export default function Home() {
  const router = useRouter();
  const { User, setUser, loading } = useContext(UserContext);
  const [loading1, setLoading1] = useState(false);
  const [browser, setBrowser] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (User?.role === "volunteer") {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User]);

  useEffect(() => {
    if (navigator.userAgent.indexOf("Chrome") === -1) {
      setBrowser(true);
    }
  }, []);

  async function signInWithAltPassword() {
    console.log({ password });
    axios
      .post("/api/altLogin", {
        password: password,
      })
      .then((res) => {
        if (res.data.data === true) {
          setUser({ role: "volunteer", email: "volunteer@iedc.in" });
          console.log("Logged in with alt password");
        } else alert("Wrong Password!");
      });
  }

  async function signInWithGoogle() {
    setLoading1(true);
    const { data, error } = await SupabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
  }
  if (loading) return <Loader />;
  if (browser)
    return (
      <>
        <CustomTitle title="Login" />
        <div className={styles.login_container}>
          <Image src={logo} alt="" width={300} />
          <div className={styles.login_warning}>
            Please use Google Chrome to use this website.
          </div>
        </div>
      </>
    );
  return (
    <>
      <CustomTitle title="Login" />
      <div className={styles.login_container}>
        <Image src={logo} alt="" width={300} />
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
          <input
            type="password"
            placeholder="Password"
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
        <h2
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
        </div>
      </div>
    </>
  );
}
