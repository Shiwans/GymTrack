import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import ManualAttendanceModal from "./ManualAttendanceModal";

const MarkAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showManualModal, setShowManualModal] = useState(false);
  const { authRequest, token } = useAuth(); // Destructure token here
  const [totalMembers, setTotalMembers] = useState(0); // Sta
  const [presentCount, setPresentCount] = useState(0); // State for present count
  const [unmarkedCount, setUnmarkedCount] = useState(0);
  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        if (!token) {
          console.error("Token is missing!");
          alert("You are not logged in!");
          return;
        }
        const membersResponse = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/admin/members/count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalMembers(membersResponse.data.count);


        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/admin/attendance?date=${
            selectedDate.toISOString().split("T")[0]
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.attendance) {
          const attendance = response.data.attendance;

          // Calculate present count
          const present = attendance.filter((item) => item.present === true).length;
          setPresentCount(present);
          setUnmarkedCount(membersResponse.data.count - present);

          // Extract morning and evening attendance
          const morningData = attendance
            .filter((item) => item.shift === "morning")
            .slice(-10);
          const eveningData = attendance
            .filter((item) => item.shift === "evening")
            .slice(-10);

          setAttendanceData({
            morning: morningData,
            evening: eveningData,
          });
        } else {
          setAttendanceData({ morning: [], evening: [] });
          setPresentCount(0);
          setUnmarkedCount(membersResponse.data.count);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        // ... (error handling)
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedDate, token]);

  const handleDelete = async (attendanceId) => {
    try {
      await authRequest.delete(`/admin/attendance/${attendanceId}`);
      // Update attendanceData after successful delete
      setAttendanceData((prevData) => ({
        ...prevData,
        morning: prevData.morning.filter((item) => item._id !== attendanceId),
        evening: prevData.evening.filter((item) => item._id !== attendanceId),
      }));
    } catch (error) {
      console.error("Error deleting attendance:", error);
      // Handle error, e.g., show error message
    }
  };

  if (loading) {
    return <div className="p-8 bg-gray-100 min-h-screen">Loading...</div>;
  }

  const { morning, evening } = attendanceData || {
    morning: [],
    evening: [],
  };

  const handleManualAttendanceClick = () => {
    setShowManualModal(true);
  };

  const handleAttendanceMarked = async () => {
    // Refresh attendance data after marking attendance manually
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/admin/attendance?date=${
          selectedDate.toISOString().split("T")[0]
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">
            {formatDate(selectedDate)}
          </span>
          <input
            type="date"
            className="border rounded p-2"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
        </div>
       <div className="flex justify-around bg-gray-200 p-4 rounded-lg">
          <div>
            <div className="text-sm text-gray-600">Total member</div>
            <span className="font-semibold">10</span>
          </div>
          <div>
            <div className="text-sm text-gray-600">Present</div>
            <span className="font-semibold">4</span>
          </div>
          <div>
            <div className="text-sm text-gray-600">Unmarked</div>
            <span className="font-semibold">6</span>
          </div>
        </div>
        <button
          className="bg-orange-400 rounded-lg p-2 mt-4 text-white"
          onClick={handleManualAttendanceClick} // Open modal on button click
        >
          manual attendance
        </button>

        <Link to="/holiday">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
            Holiday
          </button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Morning attendance</h3>
        {morning.length === 0 ? (
          <p>No morning attendance records found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th>Id</th>
                <th>Name</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {morning.map((item) => (
                <tr key={item._id} className="border-t">
                  <td>{item.memberId}</td>
                  <td>{item.memberName}</td>
                  <td>{item.time}</td>
                  <td>
                    <FaTrash
                      className="inline-block cursor-pointer text-red-600"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Evening attendance</h3>
        {evening.length === 0 ? (
          <p>No evening attendance records found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th>Id</th>
                <th>Name</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {evening.map((item) => (
                <tr key={item._id} className="border-t">
                  <td>{item.memberId}</td>
                  <td>{item.memberName}</td>
                 <FaTrash
                      className="inline-block cursor-pointer text-red-600"
                      onClick={() => handleDelete(item._id)}
                    />
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showManualModal && (
        <ManualAttendanceModal
          onClose={() => setShowManualModal(false)}
          selectedDate={selectedDate}
          onAttendanceMarked={handleAttendanceMarked}
        />
      )}
    </div>
  );
};

export default MarkAttendance;
