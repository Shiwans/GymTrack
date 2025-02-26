// import { createContext, useContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";

// // Create AuthContext
// const AuthContext = createContext();

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   // Store authentication state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   // Check for stored authentication state on app load
//   useEffect(() => {
//     const storedUser = Cookies.get("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setIsAuthenticated(true);
//       setUserRole(user.role);
//     }
//   }, []);

//   // Function to log in user
//   const login = (user) => {
//     Cookies.set("user", JSON.stringify(user), { expires: 1, secure: true, sameSite: "Strict" }); // Expires in 1 day
//     setIsAuthenticated(true);
//     setUserRole(user.role);
//   };

//   // Function to log out user
//   const logout = () => {
//     Cookies.remove("user");
//     setIsAuthenticated(false);
//     setUserRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
