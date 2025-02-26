import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Footer from "./components/Footer"
import Leaderboard from "./pages/Leaderboard"


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} /> 
       <Route path="/attendance" element={<Attendance />} /> 
       <Route path="/data" element={<Data />} /> 
       <Route path="/leaderboard" element={<Leaderboard />} /> 
       <Route path="/profile" element={<Profile />} /> 
       <Route path="/admin/members" element={<Members />} /> 
       <Route path="/mark-attendance" element={<MarkAttendance />} /> 
       <Route path="/add-members" element={<AddMembers />} /> 
       <Route path="/dashboard" element={<Dashboard />} /> 


        {/* <Route 
          // path="/attendance"
          // element={<PrivateRoute element={<Attendance />} />}
        {/* /> 
         <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />

        //  Admin Routes 
        <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole="admin" element={<Dashboard />} />
          }
        />
        <Route
          path="/mark-attendance"
          element={
            <PrivateRoute requiredRole="admin" element={<MarkAttendance />} />
          }
        />
        <Route
          path="/members"
          element={<PrivateRoute requiredRole="admin" element={<Members />} />}
        />
        <Route
          path="/add-members"
          element={
            <PrivateRoute requiredRole="admin" element={<AddMembers />} />
          }
        />*/}

        {/* //  Login Route  */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/reset" element={<SetPassword />} /> 
        <Route path="/otp" element={<OtpComponent />} /> 

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
