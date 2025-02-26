import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEdit, FaTrash, FaSync } from "react-icons/fa";
import erick from "../assets/erick.jpg";

const fetchMembers = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/admin/members`,{withCredentials:true}); // Replace with your backend URL
  console.log(data.members)
  return data.members;
};

export default function MemberTable() {
  const [search, setSearch] = useState("");

    // Fetch members using React Query
    const { data: memberss = [], isLoading, error } = useQuery({
      queryKey: ["members"],
      queryFn: fetchMembers,
    });

    if (isLoading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-red-500">Error: {error.message}</p>;

    if (!Array.isArray(memberss)) {
      console.error("Expected an array but got:", memberss);
      return null; // or return an empty array []
    }
    const filteredMembers = memberss.filter((member) =>
      member.firstName.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_BACK_URL}/admin/members/${id}`);
        queryClient.invalidateQueries(["members"]); // Refresh data after deletion
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    };
    

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-lg w-1/3"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">+ Add Member</button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Age</th>
              <th className="p-2">Package</th>
              <th className="p-2">Expires on</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="p-2">{member.Id}</td>
                <td className="p-2">
                  {/* <img src={member.image} alt="Profile" className="w-10 h-10 rounded-full" /> */}
                  <img src={member.image || erick} alt="Profile" className="w-10 h-10 rounded-full" />
                </td>
                <td className="p-2">{member.firstName}</td>
                <td className="p-2">{member.age}</td>
                <td className="p-2">{member.package}</td>
                <td className="p-2">{member.expiresOn}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${
                      member.status === "Expired"
                        ? "bg-red-200 text-red-600"
                        : "bg-green-200 text-green-600"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="p-2 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(member.id)}
                  >
                    <FaTrash />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaSync />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
