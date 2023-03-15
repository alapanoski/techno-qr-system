import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import { SupabaseClient } from "../utils";

export const UserContext = createContext();

function UserState(props) {
  const [User, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function getUser() {
    const {
      data: { user },
    } = await SupabaseClient.auth.getUser();
    //console.log(user);
    if (user) {
      const { data, error } = await SupabaseClient.from("volunteers").select();
      if (
        data.find((volunteer) => {
          return volunteer.email === user.email;
        })
      ) {
        user.role = "volunteer";
      } else {
        user.role = "user";
      }
    }
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
  }
  useEffect(() => {
    if (!(User?.role === "volunteer" || User?.role === "user")) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User]);

  SupabaseClient.auth.onAuthStateChange((event, session) => {
    // if(!sessionStorage.getItem('user'))
    // setUser(session?.user ?? null);
    getUser();
  });
  return (
    <UserContext.Provider value={{ User: User, setUser, loading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
