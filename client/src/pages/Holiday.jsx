import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Holiday = () => {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [shift, setShift] = useState('morning'); // Default shift
  const [holidays, setHolidays] = useState([]);
  const { authRequest,token } = useAuth();

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        if (!token) {
          console.error('Token is missing!');
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/admin/holidays`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHolidays(response.data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, [token]); // Use token as dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        console.error('Token is missing!');
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_BACK_URL}/admin/holidays`,
        { date, reason, shift },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh holidays list after successful submission
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/admin/holidays`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHolidays(response.data);
      // Clear form fields
      setDate('');
      setReason('');
      setShift('morning');
    } catch (error) {
      console.error('Error adding holiday:', error);
    }
  };


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Holidays</h2>

      {/* Holiday form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 font-bold mb-2">
            Reason:
          </label>
          <input
            type="text"
            id="reason"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="shift" className="block text-gray-700 font-bold mb-2">
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
            <option value="both">Both</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Holiday
        </button>
      </form>

      {/* Holiday table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Holidays List</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th>Date</th>
              <th>Reason</th>
              <th>Shift</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday._id} className="border-t">
                <td>{new Date(holiday.date).toLocaleDateString()}</td>
                <td>{holiday.reason}</td>
                <td>{holiday.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holiday;