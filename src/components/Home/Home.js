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
  const [id, setId] = React.useState();
  const [loading1, setLoading1] = React.useState(false);

  async function getUsers() {
    setLoading1(true);
    const data = await SupabaseClient.from("users").select("*");
    setUsers(data.data);
    setLoading1(false);
    console.log(users);
  }

  async function getID(value) {
    setLoading1(true);
    if (value?.techno_id) {
      setId(value.techno_id);
    } else {
      setId("Not Found");
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
