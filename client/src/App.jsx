import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Attendance from "./pages/Attendance";
import Data from "./pages/Data";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import MarkAttendance from "./pages/MarkAttendance";
import Members from "./pages/Members";
import AddMembers from "./pages/AddMembers";
import Login from "./components/Login/LoginComponent";
import OtpComponent from "./components/Login/OtpComponent";
import SetPassword from "./components/Login/SetPassword";
import Footer from "./components/Footer";
import Leaderboard from "./pages/Leaderboard";
import { PrivateRoute } from "./PrivateRoutes.jsx";
import { useAuth } from "./context/AuthContext";
import Holiday from "./pages/Holiday.jsx";
import SeeMember from "./pages/SeeMember.jsx";
// import ManualAttendanceModal from "./pages/ManualAttendanceModal.jsx";

const App = () => {
  const { token } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/attendance" element={<PrivateRoute element={<Attendance />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/data" element={<PrivateRoute element={<Data />} />} />
        <Route path="/leaderboard" element={<PrivateRoute element={<Leaderboard />} />} />
        <Route path="/dashboard" element={<PrivateRoute requiredRole="admin" element={<Dashboard />} />} />
        <Route path="/holiday" element={<PrivateRoute requiredRole="admin" element={<Holiday />} />} />
        <Route path="/admin/members/:memberId" element={<PrivateRoute requiredRole="admin" element={<SeeMember />} />} />
        <Route path="/mark-attendance" element={<PrivateRoute requiredRole="admin" element={<MarkAttendance />} />} />
        <Route path="/members" element={<PrivateRoute requiredRole="admin" element={<Members />} />} />
        <Route path="/add-members" element={<PrivateRoute requiredRole="admin" element={<AddMembers />} />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/reset" element={token ? <Navigate to="/" /> : <SetPassword />} />
        <Route path="/otp" element={token ? <Navigate to="/" /> : <OtpComponent />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;