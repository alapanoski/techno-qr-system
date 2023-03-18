import { useEffect, useState } from "react";
import SupabaseClient from "../utils/SupabaseClient";
import {Loader } from "../components/";
function CheckIn() {
  const [users, setUsers] = useState([]);
  const [loading , setLoading] = useState(false);
  async function getUsers() {
    setLoading(true);
    const { data } = await SupabaseClient.from("users").select("*");
    setUsers(data);
    setLoading(false);
  }
  useEffect(() => {
    getUsers();
  }, []);
    if (loading) {
        return <Loader/>;
    }
  return (
    <div style={{
        display: "flex",
    }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Techno ID</th>
            <th>Name</th>
            <th>Email</th>
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
              <td>{user.id}</td>
              <td>{user?.techno_id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CheckIn;
