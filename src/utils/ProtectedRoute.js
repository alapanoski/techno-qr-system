import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import { Loader } from "../components";

const ProtectedRoute = (WrappedComponent, role) => {
  const ProtectedRouteComponent = (props) => {
    const { User, loading, roleLoaded } = useContext(UserContext);
    const Router = useRouter();
    useEffect(() => {
      if (!loading && !User) {
        Router.push("/");
      }
      if (User?.email && User.role === "user") Router.push("/");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [User, loading]);

    if (User?.email && User.role === "volunteer")
      return <WrappedComponent {...props} />;
    if (User?.email && User.role === "user") Router.push("/");
    return <Loader />;
  };

  return ProtectedRouteComponent;
};
export default ProtectedRoute;
