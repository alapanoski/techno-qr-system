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
    linkedin:"https://www.linkedin.com",
    email:"email@email.com",
    github:"https://www.github.com",
    profile_image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  };

  return (
    <div className="container mx-auto max-h-screen flex justify-center gap-2">
      <User user={user} />
    </div>
  );
};

export default Post;
