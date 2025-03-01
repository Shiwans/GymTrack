import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import dashboard from "../assets/dashboard-image.png";

const Dashboard = () => {
  const [qrCode, setQrCode] = useState("");
  const { isAuthenticated } = useAuth(); // ✅ Use authentication state

  const fetchQrCode = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage
      if (!token) {
        console.error("No token found, user not authenticated.");
        return;
      }

      const response = await axios.get("http://localhost:5555/admin/generate", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Pass token in header
      });

      if (response.data.success) {
        setQrCode(response.data.qrCode);
      }
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchQrCode(); // ✅ Fetch QR only if authenticated
      const interval = setInterval(fetchQrCode, 120000); // Auto-refresh every 2 min
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [isAuthenticated]); // ✅ Runs only when authentication status changes

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h2 style={styles.text}>Scan Below QR Code</h2><div><h2 style={styles.text}>for Marking</h2></div>
        <div style={styles.qrBox}>
          {qrCode ? (
            <img src={qrCode} alt="QR Code" style={styles.qrImage} />
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
