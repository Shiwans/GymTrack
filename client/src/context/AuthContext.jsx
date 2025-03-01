import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token") || null;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  });
  const [role, setRole] = useState(() => {
    try {
      return localStorage.getItem("role") || null;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  console.log("Initial token state:", token);
  console.log("Initial role state:", role);

  const authRequest = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL,
  });

  useEffect(() => {
    try {
      if (token && role) {
        authRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete authRequest.defaults.headers.common["Authorization"];
      }
    } catch (error) {
      console.error("Error setting headers:", error);
    } finally {
      setLoading(false);
    }
  }, [token, role]);

  const login = (newToken, newRole) => {
    try {
      localStorage.setItem("token", newToken);
      localStorage.setItem("role", newRole);
      setToken(newToken);
      setRole(newRole);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await authRequest.post("/auth/logout");
        if (response.status !== 200) {
          console.error("Logout failed with status:", response.status);
          console.error("Logout response data:", response.data);
          throw new Error("Logout failed");
        }
      }
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken(null);
      setRole(null);
      navigate('/login');
    } catch (error) {
      console.error("Logout error details:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken(null);
      setRole(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, authRequest, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;