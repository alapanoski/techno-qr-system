import Image from "next/image";
import React from "react";
import { Loader } from "../../components";
import supabaseClient from "../../utils/supabaseClient";
import profile from "../../assets/temp_profile.jpeg";
import styles from "../../styles/Users.module.css";
import logo from "../../assets/logo.png";
import { useRouter } from "next/router";
import CustomTitle from "../../utils/customTitle";

function Users() {
  const [users, setUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  async function fetchUsers() {
    await supabaseClient
      .from("users")
      .select()
      .then((data) => {
        setUsers(data.data);
        setAllUsers(data.data);
        setLoading(false);
      });
  }
  function handleSearch(value) {
    if (value) {
      const filteredUsers = allUsers.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setUsers(filteredUsers);
    } else {
      setUsers(allUsers);
    }
  }
  React.useEffect(() => {
    fetchUsers();
  }, []);
  if (loading) return <Loader />;

  return (
    <>
      <CustomTitle title="Users" />
      <div className={styles.users_container}>
        <Image src={logo} alt="" className={styles.user_profile_logo} />
        <input
          type="text"
          placeholder="Search Users"
          className={styles.search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <div className={styles.user_container_cards}>
          {users.map((user, index) => (
            <div
              key={index}
              className={styles.user_card_container}
              onClick={() => {
                router.push(`/users/${user.techno_id}`);
              }}
            >
              <div className={styles.user_card_image_container}>
                <Image
                  src={user.image ? user.image : profile}
                  alt=""
                  width={150}
                  height={150}
                  className={styles.user_card_image}
                />
              </div>
              <div className={styles.user_card_container_details}>
                <div className={styles.user_card_id}>
                  Techno ID : <b>{user?.techno_id}</b>
                </div>
                <div className={styles.user_card_name}>{user.name}</div>
                <div className={styles.user_card_designation}>
                  {user?.designation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
