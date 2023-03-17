import Image from "next/image";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../../styles/Home.module.css";
import logo from "../../assets/logo.png";
import { SupabaseClient } from "../../utils";

function Home() {
  const [name, setName] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [id, setId] = React.useState();
  const [loading1, setLoading1] = React.useState(false);

  async function getUsers() {
    setLoading1(true);
    const users = await SupabaseClient.from("users").select("*");
    setUsers(users.data);
    setLoading1(false);
  }

  async function getID() {
    setLoading1(true);
    const user = users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );
    if (user) {
      console.log(user);
      setId(user.techno_id);
    } else {
      setId("User not found");
    }
    setName("");
    setLoading1(false);
  }

  useEffect(() => {
    getUsers();
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
          <input
            type="text"
            placeholder="Enter Name"
            style={{
              border: "1px solid #041c2b",
            }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div
            onClick={getID}
            className={styles.login_button}
            style={{
              cursor: "pointer",
            }}
          >
            Submit
          </div>
        </div>

        {id && (
          <div className={styles.login_button}>
            {loading1 ? <ClipLoader /> : id && id}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
