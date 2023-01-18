/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { Loader } from "../../components";
import profile from "../../assets/temp_profile.jpeg";
import styles from "../../styles/Users.module.css";
import logo from "../../assets/logo.png";
import { useRouter } from "next/router";
import { CustomTitle, SupabaseClient } from "../../utils";

function Users() {
  const [users, setUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  async function fetchUsers() {
    await SupabaseClient.from("users")
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
        <div className={styles.users_profile_logo}>
          <Image src={logo} alt="" />
        </div>
        <input
          type="text"
          placeholder="Search Users"
          className={styles.search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <div className={styles.user_container_cards}>
          {users.length === 0 && (
            <div className={styles.no_users}>No Users Found</div>
          )}
          {users.map((user, index) => (
            <div
              key={index}
              className={styles.user_card_container}
              onClick={() => {
                router.push(`/users/${user.techno_id}`);
              }}
            >
              <div className={styles.user_card_image_container}>
                <img
                  src={
                    user.image
                      ? user.image
                      : "https://people.com/thmb/JGjxumyykHNuBoeyuELz33P2uHY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x309:721x311)/rick-astley-recreation-never-gonna-give-you-up-081922-1-909d277568c34a599c27fa7503ce7a4c.jpg"
                  }
                  alt=""
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
