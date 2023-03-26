import { useEffect, useState } from "react";
import SupabaseClient from "../../utils/SupabaseClient";
import { Loader } from "../../components/";
import { useRouter } from "next/router";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
function CheckIn() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [registerList, setRegisterList] = useState([]);
  const [noOfCheckedIn, setNoOfCheckedIn] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = router.query;

  async function getUsers() {
    setLoading(true);
    const { data } = await SupabaseClient.from("users").select("*");
    console.log(data);

    setUsers(data);
    setLoading(false);
  }

  async function getRegisterList() {
    setLoading(true);

    if (id) {
      const { data, error } = await SupabaseClient.from("register")
        .select("*, users(*)")
        .eq("event_id", parseInt(id));
      // console.log(id, data);
      setRegisterList(data);
      let count = 0;
      data?.forEach((user) => {
        if (user.band_id) {
          count++;
        }
      });
      setNoOfCheckedIn(count);
      setLoading(false);
    }
  }
  useEffect(() => {
    getUsers();
    getRegisterList();
  }, [id]);

  const rows = registerList?.length
    ? registerList.map((user) => ({
        id: user.id,
        col1: user?.band_id,
        col2: user.users.name,
        col3: user.users.phone,
        col4: user.users.email,
        col5: user.check_in_time
          ? new Date(user?.check_in_time).toLocaleDateString() +
            ", " +
            new Date(user?.check_in_time).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : "Not Checked In",
        col6: user.users?.category,
        col7:user.users?.food_preference
      }))
    : [];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "col1", headerName: "Band ID", width: 140 },
    { field: "col2", headerName: "Name", width: 300 },
    { field: "col3", headerName: "Phone", width: 200 },
    { field: "col4", headerName: "Email", width: 300 },
    {
      field: "col5",
      headerName: "Check In Time",
      width: 200,
    },
    {
      field: "col6",
      headerName: "Category",
      width: 200,
    },
    {
      field:"col7",
      headerName:"Food Preference",
      width:200
    }
  ];
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
          Total: <strong>{users?.length}</strong>
          <br />
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
