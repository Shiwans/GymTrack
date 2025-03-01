import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios"
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const attendanceData = [
  { month: "Jan", present: 20, holidays: 5 },
  { month: "Feb", present: 18, holidays: 6 },
  { month: "Mar", present: 22, holidays: 4 },
  { month: "Apr", present: 25, holidays: 5 },
  { month: "May", present: 19, holidays: 7 },
];

const lastAttendanceRecords = [
  { date: "12th Aug 2024", shift: "Morning", status: "Present" },
  { date: "11th Aug 2024", shift: "Evening", status: "Absent" },
  { date: "10th Aug 2024", shift: "Both", status: "Present" },
  { date: "9th Aug 2024", shift: "Morning", status: "Absent" },
  { date: "8th Aug 2024", shift: "Evening", status: "Present" },
];

export default function MemberDashboard() {
  const [holidays, setHolidays] = useState([]);
  const { authRequest,token } = useAuth();

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/admin/holidays`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
        setHolidays(response.data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
        // ... handle error (e.g., display error message)
      }
    };
  
    fetchHolidays();
  }, [token]);
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-300">
      {/* Membership Details */}
      <Card sx={{ padding: 2 }}>
        <CardHeader title="Membership Expiry" />
        <CardContent>
          <Typography variant="h6">Expiry Date: 31st Dec 2024</Typography>
        </CardContent>
      </Card>

      <Card sx={{ padding: 2 }}>
        <CardHeader title="Total Days Remaining" />
        <CardContent>
          <Typography variant="h6">150 Days</Typography>
        </CardContent>
      </Card>

      <Card sx={{ padding: 2 }}>
        <CardHeader title="Days Attended" />
        <CardContent>
          <Typography variant="h6">45 Days</Typography>
        </CardContent>
      </Card>

      {/* Attendance Bar Chart */}
      <Card sx={{ gridColumn: "span 3", padding: 2 }}>
        <CardHeader title="Monthly Attendance" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis domain={[0, 31]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#4CAF50" name="Present" />
              <Bar dataKey="holidays" fill="#FF9800" name="Holidays/Sundays" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Last 5 Attendance Records */}
      <Card sx={{ gridColumn: "span 2", padding: 2 }}>
        <CardHeader title="Recent Attendance" />
        <CardContent>
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Shift</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {lastAttendanceRecords.map((record, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{record.date}</td>
                  <td className="border p-2">{record.shift}</td>
                  <td className={`border p-2 ${record.status === "Present" ? "text-green-500" : "text-red-500"}`}>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Upcoming Holidays */}
      {/* <Card sx={{ gridColumn: "span 2", padding: 2 }}>
        <CardHeader title="Upcoming Holidays" />
        <CardContent>
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Reason</th>
                <th className="border p-2">Shift</th>
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
        </CardContent>
      </Card> */}
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
}
