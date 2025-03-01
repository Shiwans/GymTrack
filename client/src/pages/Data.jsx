// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
// // import { dataset, valueFormatter } from '../dataset/weather';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

//in bar chart show holidays total days and total day's present in there
// const dataset = [
//   {
//     london: 59,
//     paris: 57,
//     newYork: 86,
//     seoul: 21,
//     month: 'Jan',
//   },
//   {
//     london: 50,
//     paris: 52,
//     newYork: 78,
//     seoul: 28,
//     month: 'Feb',
//   },
//   {
//     london: 47,
//     paris: 53,
//     newYork: 106,
//     seoul: 41,
//     month: 'Mar',
//   },
//   {
//     london: 54,
//     paris: 56,
//     newYork: 92,
//     seoul: 73,
//     month: 'Apr',
//   },
//   {
//     london: 57,
//     paris: 69,
//     newYork: 92,
//     seoul: 99,
//     month: 'May',
//   },
//   {
//     london: 60,
//     paris: 63,
//     newYork: 103,
//     seoul: 144,
//     month: 'June',
//   },
//   {
//     london: 59,
//     paris: 60,
//     newYork: 105,
//     seoul: 319,
//     month: 'July',
//   },
//   {
//     london: 65,
//     paris: 60,
//     newYork: 106,
//     seoul: 249,
//     month: 'Aug',
//   },
//   {
//     london: 51,
//     paris: 51,
//     newYork: 95,
//     seoul: 131,
//     month: 'Sept',
//   },
//   {
//     london: 60,
//     paris: 65,
//     newYork: 97,
//     seoul: 55,
//     month: 'Oct',
//   },
//   {
//     london: 67,
//     paris: 64,
//     newYork: 76,
//     seoul: 48,
//     month: 'Nov',
//   },
//   {
//     london: 61,
//     paris: 70,
//     newYork: 103,
//     seoul: 25,
//     month: 'Dec',
//   },
// ];

// function valueFormatter(value) {
//   return `${value}mm`;
// }

// const chartSetting = {
//   yAxis: [
//     {
//       label: 'rainfall (mm)',
//     },
//   ],
//   width: 500,
//   height: 300,
//   sx: {
//     [`.${axisClasses.left} .${axisClasses.label}`]: {
//       transform: 'translate(-20px, 0)',
//     },
//   },
// };

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

// export default function Data() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <>
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>

//     <BarChart
//       dataset={dataset}
//       xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
//       series={[
//         { dataKey: 'london', label: 'London', valueFormatter },
//         { dataKey: 'paris', label: 'Paris', valueFormatter },
//         { dataKey: 'newYork', label: 'New York', valueFormatter },
//         { dataKey: 'seoul', label: 'Seoul', valueFormatter },
//       ]}
//       {...chartSetting}
//     />
//     </>
//   );
// }

//frontend ka data
//for ss 
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

const upcomingHolidays = [
  { date: "15th Aug 2024", reason: "Independence Day", shift: "Both" },
  { date: "2nd Oct 2024", reason: "Gandhi Jayanti", shift: "Morning" },
  { date: "25th Dec 2024", reason: "Christmas", shift: "Both" },
];

export default function MemberDashboard() {
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
      <Card sx={{ gridColumn: "span 2", padding: 2 }}>
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
              {upcomingHolidays.map((holiday, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{holiday.date}</td>
                  <td className="border p-2">{holiday.reason}</td>
                  <td className="border p-2">{holiday.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
