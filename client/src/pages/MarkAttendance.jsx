import React from 'react'
import { FaTrash } from "react-icons/fa";

const MarkAttendance = () => {
  return (
    <>
        <div>
            <div className='w-200 h-20 bg-gray-200 p-10 rounded-3xl'>
                {/* here it must fetch today's day automatically */}
                <span>19 Feb 2025 | Wed</span> 
                <input className='ml-100' type='Date'></input>
            </div>
            <div className='w-200 h-30 bg-gray-400 p-10 flex gap-50 rounded-4xl'>
                <div>
                 <div>Total marked</div>
                  <span>3</span>
                </div>

                <div>
                <div>Present</div>
                <span>3</span>
                </div>
                <div>
                <div>Absent</div>
                <span>3</span>
                </div>
            </div>
            <button className='bg-orange-400 rounded-lg p-2 my-5 text-white'>Manual attendance</button>
        </div>
        <div>
          <h3>Morning attendance</h3>
          <table className="w-full mt-2 border">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th >Id</th>
                      <th>Name</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td >#2312</td>
                      <td>Shiwans</td>
                      <td>6:10</td>
                      <td>
                        <FaTrash className="inline-block cursor-pointer text-red-600" />
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td >#2312</td>
                      <td>Shiwans</td>
                      <td>6:10</td>
                      <td>
                        <FaTrash className="inline-block cursor-pointer text-red-600" />
                      </td>
                    </tr>
                  </tbody>
                </table>
        </div>
        <div className='mt-15'>
          <h3>Evening attendance</h3>
          <table className="w-full mt-2 border">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th >Id</th>
                      <th>Name</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td >#2312</td>
                      <td>Shiwans</td>
                      <td>6:10</td>
                      <td>
                        <FaTrash className="inline-block cursor-pointer text-red-600" />
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td >#2312</td>
                      <td>Shiwans</td>
                      <td>6:10</td>
                      <td>
                        <FaTrash className="inline-block cursor-pointer text-red-600" />
                      </td>
                    </tr>
                  </tbody>
                </table>
        </div>
    </>
  )
}

export default MarkAttendance