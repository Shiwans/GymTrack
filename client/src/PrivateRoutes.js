// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PrivateRoute = ({ element, requiredRole }) => {
//   const { isAuthenticated, userRole } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && userRole !== requiredRole) {
//     return <Navigate to="/" />;
//   }

//   return element;
// };

// export default PrivateRoute;
