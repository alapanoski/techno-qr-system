import { useEffect, useState, createContext } from "react";
import supabaseClient from "../utils/supabaseClient";
import { useRouter } from "next/router";

export const UserContext = createContext();

function UserState(props) {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  async function getUser() {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    if (user) {
      const { data, error } = await supabaseClient.from("volunteers").select();
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

  supabaseClient.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null);
  });
  return (
    <UserContext.Provider value={{ User: User, setUser, loading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
