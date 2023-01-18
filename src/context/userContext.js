import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import { SupabaseClient } from "../utils";

export const UserContext = createContext();

function UserState(props) {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  async function getUser() {
    const {
      data: { user },
    } = await SupabaseClient.auth.getUser();
    if (user) {
      const { data, error } = await SupabaseClient.from("volunteers").select();
      if (
        data.find((volunteer) => {
          return volunteer.email === user.email;
          1;
        })
      ) {
        user.role = "volunteer";
      } else {
        user.role = "user";
      }
    }
    setUser(user);
    setLoading(false);
  }
  useEffect(() => {
    if (!User?.role) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User]);

  SupabaseClient.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null);
  });
  return (
    <UserContext.Provider value={{ User: User, setUser, loading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
