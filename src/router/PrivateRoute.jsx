import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  if (auth?.currentUser) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
