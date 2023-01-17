import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader/Loader";

const ProtectedRoute = (WrappedComponent, role) => {
  const ProtectedRouteComponent = (props) => {
    const { user, loading, roleLoaded } = useContext(UserContext);
    const Router = useRouter();
    useEffect(() => {
      if (!loading && !user) {
        Router.push("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    if (loading || !user) return <Loader/>;

    if (role == "volunteer" && user.role != "volunteer")
      return <div>Not Authorized</div>;
    return <WrappedComponent {...props} />;
  };

  return ProtectedRouteComponent;
};

export default ProtectedRoute;