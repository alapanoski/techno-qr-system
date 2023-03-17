/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "../../components";
import profile from "../../assets/temp_profile.jpeg";
import Image from "next/image";
import styles from "../../styles/User.module.css";
import logo from "../../assets/logo.png";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaDev,
} from "react-icons/fa";
import { FiGlobe, FiPhoneCall } from "react-icons/fi";
import { HiPhone } from "react-icons/hi";
import Error from "../404";
import { CustomTitle, SupabaseClient } from "../../utils";

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);

  async function fetchUser() {
    await SupabaseClient.from("users")
      .select()
      .eq("techno_id", id)
      .then((data) => {
        setUser(data.data[0]);
        setLoading(false);
      });
  }
  useEffect(() => {
    if (id) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (loading) return <Loader />;
  if (!user) return <Error />;
  return (
    <>
      <CustomTitle title={user.name} />
      <div className={styles.user_profile_container}>
        <div className={styles.user_profile_logo}>
          <Image src={logo} alt="" />
        </div>
        <div className={styles.user_profile_card_container}>
          <div className={styles.user_profile_image_container}>
            <img
              src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${user?.email}`}
              alt=""
            />
          </div>
          <div className={styles.user_profile_name}>{user.name}</div>
          <div className={styles.user_profile_designation}>
            {user?.designation.toLowerCase().includes("team")
              ? user?.designation
              : `Team ${user?.designation}`}
          </div>
          <div
            className={styles.user_profile_designation}
            style={{
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            {user?.organization}
          </div>
          {user?.grad_year && (
            <div
              className={styles.user_profile_designation}
              style={{
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Graduation Year : <b>{user?.grad_year}</b>
            </div>
          )}
          <div className={styles.user_profile_about}>{user.bio}</div>
          {user?.email && !view && (
            <div
              className={styles.user_profile_email_button}
              onClick={() => setView(!view)}
            >
              View Email
            </div>
          )}
          {view && (
            <div className={styles.user_profile_email}>{user?.email}</div>
          )}

          <div className={styles.user_profile_social_icons}>
            {/* {user?.twitter && (
              <FaTwitter
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user?.twitter, "_blank");
                }}
              />
            )}
            {user.instagram && (
              <FaInstagram
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.instagram, "_blank");
                }}
              />
            )}
            {user.portfolio && (
              <FiGlobe
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.portfolio, "_blank");
                }}
              />
            )} */}
            {user?.phone && (
              <HiPhone
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(`tel:${user?.phone}`, "_blank");
                }}
              />
            )}
            {user.linkedin && (
              <FaLinkedinIn
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user?.linkedin, "_blank");
                }}
              />
            )}
            {user.github && (
              <FaGithub
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user?.github, "_blank");
                }}
              />
            )}
            {user?.devfolio && (
              <FaDev
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user?.devfolio, "_blank");
                }}
              />
            )}
          </div>
        </div>
        <div
          className={styles.users_button}
          onClick={() => router.push("/users")}
        >
          View All Users
        </div>
      </div>
    </>
  );
};

export default UserProfile;
