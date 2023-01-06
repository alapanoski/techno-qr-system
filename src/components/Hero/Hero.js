import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import styles from "./Hero.module.css";
import logo from "../../assets/logo.png";
import supabaseClient from "../../utils/supabaseClient";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Hero() {
  const [user, setUser] = useState();
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
  const router = useRouter();
  async function signInWithGoogle() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(data);
  }

  return (
    <div className={styles.hero_container}>
      <Image src={logo} alt="" width={400} height={400} />
      <Button
        className={styles.hero_button}
        variant="contained"
        onClick={signInWithGoogle}
      >
        Login with Google
      </Button>
    </div>
  );
}
