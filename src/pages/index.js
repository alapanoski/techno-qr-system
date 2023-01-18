import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import logo from "../assets/logo.png";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { Loader } from "../components";
import { ClipLoader } from "react-spinners";
import { CustomTitle, SupabaseClient } from "../utils";

export default function Home() {
  const router = useRouter();
  const { User, setUser, loading } = useContext(UserContext);
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    if (User?.role === "volunteer") {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User]);
  async function signInWithGoogle() {
    setLoading1(true);
    const { data, error } = await SupabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
  }
  if (loading) return <Loader />;
  return (
    <>
      <CustomTitle title="Login" />
      <div className={styles.login_container}>
        <Image src={logo} alt="" width={300} />
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
