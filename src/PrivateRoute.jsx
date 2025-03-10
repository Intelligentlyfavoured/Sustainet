import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("admin"));

  if (!user) {
    return <Navigate to="/" />;
  }

  // if (!allowedRoles.includes(user.role)) {
  //   return <Navigate to="/" />;
  // }

  return <Outlet />;
};

export default PrivateRoute;
