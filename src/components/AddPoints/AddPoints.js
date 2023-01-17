import React from "react";
import supabaseClient from "../../utils/supabaseClient";

const AddPoints = () => {
  const [queryId, setQueryId] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [points, setPoints] = React.useState(0);

  async function fetchUser() {
    const { data, error } = await supabaseClient
      .from("users")
      .select()
      .eq("techno_id", queryId);
    if (error) console.log(error);
    setCurrentUser(data[0]);
  }

  async function addPoints() {
    console.log(points);
    setCurrentUser({
      ...currentUser,
      points: parseInt(currentUser.points) + parseInt(points),
    });
    console.log(currentUser);
  }
  async function reducePoints() {
    console.log(points);
    setCurrentUser({
      ...currentUser,
      points: parseInt(currentUser.points) - parseInt(points),
    });
    console.log(currentUser);
  }

  async function updatePoints() {
    const { data, error } = await supabaseClient
      .from("users")
      .update(currentUser)
      .eq("techno_id", currentUser.techno_id);
    console.log(error);
  }

  return (
    <div>
      <input
        type="text"
        name="techno_id"
        placeholder="techno id"
        onChange={(e) => {
          setQueryId(e.target.value);
        }}
      />
      <button onClick={fetchUser}>Fetch</button>
      {currentUser && (
        <div>
          <p>{currentUser.name}</p>
          <p>{currentUser.points}</p>
          <input
            type="number"
            name="points"
            placeholder="points"
            onChange={(e) => {
              setPoints(e.target.value);
            }}
          />
          <button onClick={addPoints}>Add</button>
          <button onClick={reducePoints}>Reduce</button>
          <button onClick={updatePoints}>Update</button>
        </div>
      )}
    </div>
  );
};

export default AddPoints;
