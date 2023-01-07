import { useRouter } from "next/router";
import User from "../../components/User/User";

const Post = () => {
  const router = useRouter();
  const { user_id } = router.query;

  // Make an API call. Then we will get back the following data
  const user = {
    user_id: user_id,
    payment_id: "00007",
    name: "James Bond",
  };

  const users = [
    {
      user_id: "00001",
    },
    {
      user_id: "00002",
    },
    {
      user_id: "00003",
    },
    {
      user_id: "00004",
    },
    {
      user_id: "00005",
    },
    {
      user_id: "00006",
    },
    {
      user_id: "00007",
    },
    {
      user_id: "00008",
    },
    {
      user_id: "00009",
    },
    {
      user_id: "00010",
    },
    {
      user_id: "00011",
    },
    {
      user_id: "00012",
    },
    {
      user_id: "00013",
    },

    {
      user_id: "00014",
    },
  ];

  return (
    <div className="container mx-auto max-h-screen flex flex-row justify-center gap-2">
      <div className="md:w-72 p-4 overflow-y-scroll">
        {users.map((user) => {
          return (
            <div
              key={user.user_id}
              className="h-10 flex flex-row justify-start items-center"
            >
              <p>User</p>
            </div>
          );
        })}
      </div>
      <User user={user} />
    </div>
  );
};

export default Post;
