import { useState } from "react";
import { Edit, Trash2, RotateCcw } from "lucide-react";
import erick from "../assets/Erick.jpg";
import github from "../assets/github.png"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="flex flex-col items-center py-10 bg-gray-200 min-h-screen">
      <div className="w-3/4 p-5 bg-white rounded-lg shadow-lg">
        <div className="flex gap-6">
          {/* Sidebar - Profile Info */}
          <div className="w-1/4 flex flex-col items-center border-r p-4">
            <img src={erick} alt="Profile" className="w-32 h-32 rounded-full" />
            {/* <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg">
              Upload Photo
            </button>
            <button className="mt-2 px-4 py-2 border rounded-lg">
              Take Photo
            </button> */}

            {/* Buttons */}
            {/* <div className="mt-5 flex flex-col gap-2 w-full">
              <button className="border px-4 py-2 rounded-lg">Check In</button>
              <button className="border px-4 py-2 rounded-lg">Prev Bookings</button>
              <button className="border px-4 py-2 rounded-lg">Renew</button>
            </div> */}

            {/* Membership Details */}
            <div className="mt-6 text-left w-full p-3 border rounded-md bg-gray-100">
              <h3 className="font-semibold">Membership</h3>
              <p>Shahunagar residency</p>
              <p>Current package: 1 month</p>
              <p className="font-semibold">$250.00</p>
              <p>6 Nov 2024 - 6 Dec 2024</p>
              <p>Visits: 19</p>
            </div>

            {/* About Details */}
            <div className="mt-6 text-left w-full p-3 border rounded-md bg-gray-100">
              <h3 className="font-semibold">About</h3>
              <p>Present for - 176</p>
              <p>Joining date - 12 Feb 2024 </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4 p-4">
            {/* Tabs */}
            <div className="mb-4 border-b flex gap-4">
              <button
                className={`pb-2 ${
                  activeTab === "personal"
                    ? "border-b-2 border-blue-500 font-semibold"
                    : ""
                }`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Details
              </button>
              <button
                className={`pb-2 ${
                  activeTab === "membership"
                    ? "border-b-2 border-blue-500 font-semibold"
                    : ""
                }`}
                onClick={() => setActiveTab("membership")}
              >
                Membership
              </button>
            </div>

            {/* Personal Details */}
            {activeTab === "personal" && (
              <div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Personal Information
                  </h2>
                  {/* <button className="border px-4 py-2 rounded-lg">Edit</button> */}
                </div>
                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Id:</strong> #20235
                  </p>
                  <p>
                    <strong>FirstName:</strong> Shiwans
                  </p>
                  <p>
                    <strong>LastName:</strong> Vaishya
                  </p>
                  <p>
                    <strong>Email:</strong> shiwans.vaishya@gmail.com
                  </p>
                  <p>
                    <strong>Phone:</strong> 9321174733
                  </p>
                  <p>
                    <strong>Residency:</strong> Shahunagar
                  </p>
                  <p>
                    <strong>Aadhar number:</strong> 999999999999
                  </p>
                  <p>
                    <strong>Address:</strong> Shahunagar E/5, Mahim East
                  </p>
                  <p>
                    <strong>DOB:</strong> 12 Feb 2005 (Age: 20)
                  </p>
                  <p>
                    <strong>Gender:</strong> Male
                  </p>
                </div>
                <hr className="my-5" />
                <h2 className="text-xl font-semibold">Medical Information</h2>
                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Emergency Contact:</strong> Shailendra kumar vaishya
                  </p>
                  <p>
                    <strong>Relationship:</strong> Father
                  </p>
                  <p>
                    <strong>Number:</strong> 93332134123
                  </p>
                  <p>
                    <strong>Medical information:</strong> my blood group is B+
                  </p>
                </div>
              </div>
            )}

            {/* Membership Details */}
            {activeTab === "membership" && (
              <div>
                {/* <button className="border px-4 py-2 rounded-lg">
                  + Add Membership
                </button> */}
                <h3 className="mt-4 text-lg font-semibold">
                  Current Memberships
                </h3>
                <table className="w-full mt-2 border">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-2">Type</th>
                      <th>Price</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Status</th>
                      <th>Visits</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2">1 month</td>
                      <td>$250.00</td>
                      <td>6 Nov 2024</td>
                      <td>6 Dec 2024</td>
                      <td className="text-green-600">Unexpired</td>
                      <td>19</td>
                      <td>
                        <Edit className="inline-block mr-2 cursor-pointer text-blue-600" />
                        <Trash2 className="inline-block text-red-500 cursor-pointer" />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="mt-6 text-lg font-semibold">
                  Historic Memberships
                </h3>
                <table className="w-full mt-2 border">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-2">Type</th>
                      <th>Price</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Status</th>
                      <th>Visits</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2">6 months</td>
                      <td>$600.00</td>
                      <td>12 Mar 2024</td>
                      <td>12 Sep 2024</td>
                      <td className="text-red-500">Expired</td>
                      <td>169</td>
                      <td>
                        <RotateCcw className="inline-block cursor-pointer text-blue-600" />
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-2">1 month</td>
                      <td>$250.00</td>
                      <td>12 Feb 2024</td>
                      <td>12 Mar 2024</td>
                      <td className="text-red-500">Expired</td>
                      <td>27</td>
                      <td>
                        <RotateCcw className="inline-block cursor-pointer text-blue-600" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h3></h3>
        <img className="w-300" src={github}></img>
      </div>
    </div>
  );
}
