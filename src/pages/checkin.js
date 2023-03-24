import { useEffect, useState } from "react";
import SupabaseClient from "../utils/SupabaseClient";
import { Loader } from "../components/";
function CheckIn() {
  const [users, setUsers] = useState([]);
  const [registerList, setRegisterList] = useState([])
  const [noOfCheckedIn, setNoOfCheckedIn] = useState(0);
  const [loading, setLoading] = useState(false);
  async function getUsers() {
    setLoading(true);
    const { data } = await SupabaseClient.from("users").select('*');
    setUsers(data);
    setLoading(false);
  }

  async function getRegisterList() {
    setLoading(true);
    const { data } = await SupabaseClient.from("register").select("*, users(*)");
    setRegisterList(data);
    let count = 0;
    console.log(data);
    data?.forEach((user) => {
      if (user.band_id) {
        count++;
      }
    });
    setNoOfCheckedIn(count);

    setLoading(false);
  }
  useEffect(() => {
    getUsers();
    getRegisterList();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
    <p>{JSON.stringify(registerList)}</p>
      <div
        style={{
          padding: "10px 0",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "100px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Check In Status
        </h1>
        <p
          style={{
            textAlign: "center",
          }}
        >
          Checked In: <strong>{noOfCheckedIn}</strong>
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
              <th>Band ID</th>
              <th>Name</th>
              <th>Tech Work</th>
              <th>Non Tech Work</th>
              <th>Food food_preference</th>
              <th>Check in time</th>
            </tr>
          </thead>
          <tbody>
            {registerList.map((user) => (
              <tr
                key={user.id}
                style={{
                  backgroundColor: user.techno_id ? "green" : "white",
                }}
              >
                <td>{user?.id}</td>
                <td>{user?.band_id}</td>
                <td>{user?.users.name}</td>
                <td>{user?.users?.technical_workshop_topic}</td>
                <td>{user?.users?.non_technical_workshop_topic}</td>
                <td>{user?.users?.food_preference}</td>
                <td>
                  {user?.check_in_time
                    ? new Date(user?.check_in_time).toLocaleDateString() +
                      ", " +
                      new Date(user?.check_in_time).toLocaleString("en-US", {
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
export default CheckIn;
