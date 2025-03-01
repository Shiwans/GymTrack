import React, { useEffect, useState } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

import bgimage from "../assets/bg-attend.jpg";

const Attendance = () => {
  const [scanResult, setScanResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      async (decodedText) => {
        if (!scanResult) {
          setLoading(true);
          setScanResult(decodedText);
          await handleScan(decodedText);
          scanner.clear();
          setLoading(false);
        }
      },
      (error) => {
        setErrorMessage("QR Scan Failed. Try Again.");
        console.error("QR Scan Error:", error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []); // Empty dependency array

  const handleScan = async (data) => {
    try {
      const now = new Date();
    const hour = now.getHours();
    const shift = hour < 12 ? "morning" : "evening";
      const response = await axios.post(
        "http://localhost:5555/auth/mark",
        { qrCode: data,shift },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setScanResult(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to mark attendance");
      setScanResult("");
    }
  };

  return (
    <div className="h-screen bg-cover flex flex-col items-center justify-center">
      <img
        className="bg-cover bg-center w-full h-full absolute top-0 left-0 -z-10"
        src={bgimage}
        alt="Attendance Background"
      />
      <h2 className="text-xl font-semibold my-4 text-white">
        Scan QR Code to Mark Attendance
      </h2>
      <div id="reader" className="w-80 bg-white p-4 rounded-lg shadow-lg"></div>
      {scanResult && (
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Scanned Data: {scanResult}
        </p>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
      )}
    </div>
  );
};

export default Attendance;
