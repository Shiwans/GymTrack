import React, { useState, useEffect } from "react";
import { Edit, Trash2, RotateCcw } from "lucide-react";
import erick from "../assets/Erick.jpg";
import github from "../assets/github.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { memberId } = useParams();
  const { token } = useAuth();
  const [member, setMember] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchMember = async () => {
          setIsLoading(true);
          setError(null);
          try {
              const response = await axios.get(
                  `${import.meta.env.VITE_BACK_URL}/admin/members/${memberId}`,
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
              console.log("Response data:", response.data); // Inspect response data
              setMember(response.data.member);
              setMemberships(response.data.memberships);
          } catch (err) {
              console.error("Error fetching member:", err);
              setError(err.message || "Failed to fetch member");
          } finally {
              setIsLoading(false);
          }
      };

      fetchMember();
  }, [memberId, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!member) {
    return <div>Member not found.</div>;
  }

  return (
    <div className="flex flex-col items-center py-10 bg-gray-200 min-h-screen">
      <div className="w-3/4 p-5 bg-white rounded-lg shadow-lg">
        <div className="flex gap-6">
          {/* Sidebar - Profile Info */}
          <div className="w-1/4 flex flex-col items-center border-r p-4">
            <img src={erick} alt="Profile" className="w-32 h-32 rounded-full" />

            {/* Buttons */}
            {/* <div className="mt-5 flex flex-col gap-2 w-full">
              <button className="border px-4 py-2 rounded-lg">Check In</button>
              <button className="border px-4 py-2 rounded-lg">Prev Bookings</button>
              <button className="border px-4 py-2 rounded-lg">Renew</button>
            </div> */}

            {/* Membership Details */}
            <div className="mt-6 text-left w-full p-3 border rounded-md bg-gray-100">
              <h3 className="font-semibold">Membership</h3>
              <p>{member.residency}</p>
              {memberships.length > 0 && (
                <>
                  <p>Current package: {memberships[0].membershipType}</p>
                  <p className="font-semibold">{memberships[0].price}</p>
                  <p>
                    {new Date(memberships[0].startDate).toLocaleDateString()} -{" "}
                    {new Date(memberships[0].endDate).toLocaleDateString()}
                  </p>
                  <p>Visits: {memberships[0].visits}</p>
                </>
              )}
            </div>

            {/* About Details */}
            <div className="mt-6 text-left w-full p-3 border rounded-md bg-gray-100">
              <h3 className="font-semibold">About</h3>
              <p>Present for - 176</p>
              <p>
                Joining date -{" "}
                {member.createdAt
                  ? new Date(member.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
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
                </div>
                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Id:</strong> {member.Id}
                  </p>
                  <p>
                    <strong>FirstName:</strong> {member.firstName}
                  </p>
                  <p>
                    <strong>LastName:</strong> {member.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {member.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {member.phoneNo}
                  </p>
                  <p>
                    <strong>Residency:</strong> {member.residency}
                  </p>
                  <p>
                    <strong>Aadhar number:</strong> {member.aadharNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {member.address}
                  </p>
                  <p>
                    <strong>DOB:</strong>{" "}
                    {member.dob
                      ? new Date(member.dob).toLocaleDateString()
                      : "N/A"}{" "}
                    (Age: {member.age})
                  </p>
                  <p>
                    <strong>Gender:</strong> {member.gender}
                  </p>
                </div>
                <hr className="my-5" />
                <h2 className="text-xl font-semibold">Medical Information</h2>
                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Emergency Contact:</strong>{" "}
                    {member.emergencyContact?.name}
                  </p>
                  <p>
                    <strong>Relationship:</strong>{" "}
                    {member.emergencyContact?.relationship}
                  </p>
                  <p>
                    <strong>Number:</strong> {member.emergencyContact?.number}
                  </p>
                  <p>
                    <strong>Medical information:</strong> {member.medicalInfo}
                  </p>
                </div>
              </div>
            )}

            {/* Membership Details */}
            {activeTab === "membership" && (
              <div>
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
                    {memberships.map((membership) => (
                      <tr key={membership._id} className="border-t">
                        <td className="p-2">{membership.membershipType}</td>
                        <td className="p-2">{membership.price}</td>
                        <td className="p-2">
                          {new Date(membership.startDate).toLocaleDateString()}
                        </td>
                        <td className="p-2">
                          {new Date(membership.endDate).toLocaleDateString()}
                        </td>
                        <td className="text-green-600">
                          {membership.endDate > new Date()
                            ? "Active"
                            : "Expired"}
                        </td>
                        <td className="p-2">{membership.visits}</td>
                        <td className="p-2">
                          <Edit className="inline-block mr-2 cursor-pointer text-blue-600" />
                          <Trash2 className="inline-block text-red-500 cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <img className="w-300" src={github} alt="GitHub" />
      </div>
    </div>
  );
}
