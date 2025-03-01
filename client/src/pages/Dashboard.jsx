import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import dashboard from "../assets/dashboard-image.png";

const Dashboard = () => {
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const { isAuthenticated } = useAuth();

  const fetchQrCode = async () => {
    setIsLoading(true); // Set loading to true
    setError(null); // Reset error state

    try {
      const token = localStorage.getItem("token");
      if (!token) {
          console.error("No token found, user not authenticated.");
          return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/admin/generate`, {
          headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response); // Inspect the response

      if (response.data.success) {

          setQrCode(response.data.qrCode);
          console.log("QR Code set:", response.data.qrCode); // Check qrCode value
      } else {
          // setError(response.data.message || "Failed to fetch QR code.");
          setError("Loading....")
          console.error("API Error:", response.data.message);
      }
  } catch (error) {
      // setError(error.message || "Network error.");
      setError("Loading....")
      console.error("Fetch Error:", error);
  } finally {
      setIsLoading(false);
  }
};


  useEffect(() => {
      fetchQrCode(); 
      const interval = setInterval(fetchQrCode, 120000); 
      return () => clearInterval(interval); 
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h2 style={styles.text}>Scan Below QR Code</h2><div><h2 style={styles.text}>for Marking</h2></div>
        <div style={styles.qrBox}>
        {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p> // Display error message
          ) : qrCode ? (
            <img src={qrCode} alt="QR Code" style={styles.qrImage} aria-label="Gym Attendance QR Code"/>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "77vh",
    backgroundImage: `url(${dashboard})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(255, 87, 34, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: "20px",
    marginBottom: "10px",
  },
  qrBox: {
    width: "280px",
    height: "280px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // ✅ Fixes alignment bug
    borderRadius: "10px",
  },
  qrImage: {
    width: "80%",
    height: "80%",
  },
};

export default Dashboard;
