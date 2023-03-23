import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Loader } from "../../components";
import { SupabaseClient } from "../../utils";

function FoodCheckInDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [foodLog, setFoodLog] = React.useState([]);
  const [foodName, setFoodName] = React.useState();
  const [users, setUsers] = React.useState([]);
  const [loading1, setLoading1] = React.useState(false);

  async function getFoodLogById(id) {
    setLoading1(true);
    if (!id) return;
    const data = await SupabaseClient.from("food_log")
      .select("*")
      .eq("food_id", id);
    console.log(data.data);
    setFoodLog(data.data);
    setLoading1(false);
  }

  async function getFoodName(id) {
    setLoading1(true);
    const data = await SupabaseClient.from("food_menu")
      .select("*")
      .eq("id", id);
    setFoodName(data.data[0].name);
    setLoading1(false);
  }

  async function getUsers() {
    setLoading1(true);
    const data = await SupabaseClient.from("users").select("*");
    setUsers(data.data);
    setLoading1(false);
  }

  useEffect(() => {
    getFoodLogById(id);
    getFoodName(id);
  }, [id]);

  useEffect(() => {
    getUsers();
  }, []);

  if (loading1) {
    return <Loader />;
  }

  return (
    <>
      <div
        style={{
          padding: "10px 0",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingTop: "2rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            paddingBottom: "1rem",
          }}
        >
          {foodName} Check In Status
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            paddingBottom: "1rem",
          }}
        >
          Checked In: <strong>{foodLog.length}</strong>
        </p>
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Techno ID</th>
              <th>Team</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Check In Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                style={{
                  backgroundColor: foodLog.some(
                    (log) => log.techno_id === user.techno_id
                  )
                    ? "green"
                    : "",
                }}
              >
                <td>{user.id}</td>
                <td>{user.techno_id}</td>
                <td>{user.designation}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  {foodLog.find((log) => log.techno_id === user.techno_id)?.created_at
                    ? new Date(
                        foodLog.find(
                          (log) => log.techno_id === user.techno_id
                        )?.created_at
                      ).toLocaleDateString() +
                      ", " +
                      new Date(
                        foodLog.find(
                          (log) => log.techno_id === user.techno_id
                        )?.created_at
                      ).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                    : "Not Checked In"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FoodCheckInDetails;
