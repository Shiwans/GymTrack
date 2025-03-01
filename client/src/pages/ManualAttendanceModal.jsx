import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ManualAttendanceModal = ({ onClose, selectedDate, onAttendanceMarked }) => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [data,setData]=useState([])
  const [shift, setShift] = useState("morning");
  const { token } = useAuth(); // Get token from context

  const handleMarkAttendance = async () => {
    try {
      if (!token) {
        console.error("Token is missing!");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/admin/attendance/manual`,
        {
          date: selectedDate,
          shift,
          userId: data._id, // Use data._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        onAttendanceMarked();
        onClose();
      } else {
        console.error("Failed to mark attendance:", response.data.message);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const handleSearchMember = async () => {
    try {
      if (!token) {
        console.error("Token is missing!");
        return;
      }
      const id = typeof memberId === "object" ? memberId.Id : memberId;
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/admin/members/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      setData(response.data.member);
      if (response.data.success) {
        setMemberName(response.data.member.name);
      } else {
        console.error("Failed to find member:", response.data.message);
      }
    } catch (error) {
      console.error("Error searching member:", error);
    }
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Manual Attendance
                </h3>
                <div className="mt-2">
                  <div className="mb-4">
                    <label
                      htmlFor="memberId"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Member ID:
                    </label>
                    <input
                      type="text"
                      id="memberId"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleSearchMember}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    >
                      Search Member
                    </button>
                  </div>
                  {memberName && (
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Member Name:
                      </label>
                      <span className="text-gray-700">{memberName}</span>
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      htmlFor="shift"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Shift:
                    </label>
                    <select
                      id="shift"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={shift}
                      onChange={(e) => setShift(e.target.value)}
                    >
                      <option value="morning">Morning</option>
                      <option value="evening">Evening</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleMarkAttendance}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Mark Present
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualAttendanceModal;