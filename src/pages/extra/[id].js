import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
    try {
      const data = await SupabaseClient.from("food_menu")
        .select("*")
        .eq("id", id);
      setFoodName(data?.data[0]?.name);
      setLoading1(false);
    } catch (error) {
      console.log("error bro: ", error);
    }
  }

  async function getUsers() {
    setLoading1(true);
    const data = await SupabaseClient.from("users").select("*, register(*)");
    console.log(data.data);
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
  const rows = users.map((user) => ({
    id: user.id,
    col0: user?.register[0]?.bar_code,
    col1: user?.register[0]?.band_id,
    col2: user.name,
    col3: user.phone,
    col4: user.food_preference,
    col5: foodLog.some((log) => log.user_id === user.id)
      ? new Date(
          foodLog.find((log) => log.user_id === user.id).time_stamp
        ).toLocaleDateString() +
        ", " +
        new Date(
          foodLog.find((log) => log.user_id === user.id).time_stamp
        ).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : "Not Checked In",
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "col0", headerName: "Invite ID", width: 130 },
    { field: "col1", headerName: "Band ID", width: 130 },
    { field: "col2", headerName: "Name", width: 250 },
    { field: "col3", headerName: "Phone", width: 130 },
    { field: "col4", headerName: "Food Preference", width: 250 },
    { field: "col5", headerName: "Check In Time", width: 250 },
  ];

  if (loading1) {
    return <Loader />;
  }

  return (
    <>
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
          {foodName} Check In Status
        </h1>
        <div
          style={{
            textAlign: "center",
          }}
        >
          Checked In: <strong>{foodLog.length}</strong>
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
                <td>{user.band_id}</td>
                <td>{user.designation}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  {foodLog.find((log) => log.techno_id === user.techno_id)
                    ?.created_at
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
      </div>*/}
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

export default FoodCheckInDetails;
