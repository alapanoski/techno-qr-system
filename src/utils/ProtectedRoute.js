import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import { Loader } from "../components";

const ProtectedRoute = (WrappedComponent) => {
  const ProtectedRouteComponent = (props) => {
    const { User, loading, roleLoaded } = useContext(UserContext);
    console.log("User", User);
    const Router = useRouter();
    useEffect(() => {

      //console.log("User",User);
      if (!loading && !User) {
        Router.push("/");
      }
      // if (User?.email && User.role === "user") Router.push("/");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [User, loading]);
    //console.log(User);
    if (User)
      return <WrappedComponent {...props} />;
    // if (User?.email && User.role === "user") Router.push("/");
    return <Loader />;
  };

  return ProtectedRouteComponent;
};
export default ProtectedRoute;
