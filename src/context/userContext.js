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
      data.find((volunteer) => {
        if (volunteer.email == user.email) {
          user.role = "volunteer";
        }
      });
    }
    setUser(user);

    setLoading(false);
  }
  useEffect(() => {
    getUser();
  }, []);

  supabaseClient.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null);
    setLoading(false);
  });
  return (
    <UserContext.Provider value={{ user: User, setUser, loading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
