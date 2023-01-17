import { useContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
import logo from "../assets/logo.png";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/router";
import Image from "next/image";
import supabaseClient from "../utils/supabaseClient";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  async function getUser() {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    console.log(user);
    setUser(user);
    if (user) {
      router.push("/dashboard");
    }
  }
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function signInWithGoogle() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(data);
  }

  const router = useRouter();
  if (user) {
    router.push("/dashboard");
  }
  return (
    <>
      <div className={styles.login_container}>
        <Image src={logo} alt="" width={400} height={400} />
        <div
          className={styles.login_button}
          variant="contained"
          onClick={signInWithGoogle}
        >
          Login with Google
        </div>
      </div>
    </>
  );
}
