import { useEffect, useState } from "react";
import SupabaseClient from "../utils/SupabaseClient";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { Loader } from "../components/";
function CheckIn() {
  const [users, setUsers] = useState([]);
  const [registerList, setRegisterList] = useState([]);
  const [noOfCheckedIn, setNoOfCheckedIn] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  async function getUsers() {
    setLoading(true);
    const { data } = await SupabaseClient.from("users").select("*");
    setUsers(data);
    setLoading(false);
  }

  async function getRegisterList() {
    setLoading(true);
    const { data } = await SupabaseClient.from("register").select(
      "*, users(*)"
    );
    setRegisterList(data);
    //console.log(data);
    const rows = registerList.map((user) => ({
      id: user.id,
      col1: user?.band_id,
      col2: user.users.name,
      col3: user.check_in_time
        ? new Date(user?.check_in_time).toLocaleDateString() +
          ", " +
          new Date(user?.check_in_time).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        : "Not Checked In",
    }));
    setRows(rows);

    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "col1", headerName: "Band ID", width: 140 },
      { field: "col2", headerName: "Name", width: 300 },
      {
        field: "col3",
        headerName: "Check In Time",
        width: 300,
      },
    ];
    setColumns(columns);

    let count = 0;
    // console.log(data);
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
      {/* <p>{JSON.stringify(registerList)}</p> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start sty",
          justifyContent: "center",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Check In Status
        </h1>
        <div
          style={{
            textAlign: "center",
          }}
        >
          Checked In: <strong>{noOfCheckedIn}</strong>
        </div>

        {/* <div
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
      </div> */}
        <div
          style={{
            display: "flex",
            height: "100%",
            flexGrow: 1,
          }}
        >
          <div style={{ flexGrow: 1, overflow: "auto" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              components={{
                Toolbar: GridToolbar,
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,

                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckIn;
