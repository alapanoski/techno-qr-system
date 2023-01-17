import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader, User } from "../../components";
import supabaseClient from "../../utils/supabaseClient";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  // Make an API call. Then we will get back the following data

  async function fetchUser() {
    await supabaseClient
      .from("users")
      .select()
      .eq("techno_id", id)
      .then((data) => {
        setUser(data.data[0]);
        setLoading(false);
      });
  }
  useEffect(() => {
    if (id) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (loading) return <Loader />;
  return (
    <div className="container flex justify-center max-h-screen gap-2 mx-auto">
      <User user={user} />
    </div>
  );
};

export default Post;
