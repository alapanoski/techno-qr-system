import { useEffect, useState } from "react";
import SupabaseClient from "../utils/SupabaseClient";
import { Loader } from "../components/";
function CheckIn() {
  const [users, setUsers] = useState([]);
  const [noOfCheckedIn, setNoOfCheckedIn] = useState(0);
  const [loading, setLoading] = useState(false);
  async function getUsers() {
    setLoading(true);
    const { data } = await SupabaseClient.from("users").select("*");
    setUsers(data);

    let count = 0;
    data.forEach((user) => {
      if (user.techno_id) {
        count++;
      }
    });
    setNoOfCheckedIn(count);

    setLoading(false);
  }
  useEffect(() => {
    getUsers();
  }, []);
  if (loading) {
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
                  backgroundColor: user.techno_id ? "green" : "white",
                }}
              >
                <td>{user?.id}</td>
                <td>{user?.techno_id}</td>
                <td>{user?.designation}</td>
                <td>{user?.name}</td>
                <td>{user?.phone}</td>
                <td>
                  {user?.checkin_time
                    ? new Date(user?.checkin_time).toLocaleDateString() +
                      ", " +
                      new Date(user?.checkin_time).toLocaleString("en-US", {
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
