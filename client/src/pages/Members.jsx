import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Use custom hook
import erick from "../assets/Erick.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MemberTable() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const { authRequest, token } = useAuth(); // Get authenticated request function
  const queryClient = useQueryClient();

  // Fetch members using React Query

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!token) {
          setError("Token is missing!");
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/admin/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMembers(response.data.members); // Assuming the array is in response.data.members
      } catch (err) {
        setError(err.message || "Failed to fetch members");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [token]);
  // Handle delete function
  const handleDelete = async (id) => {
    const queryClient = useQueryClient(); // Get queryClient
    const { token } = useAuth(); // Get token from context
  
    try {
      if (!token) {
        console.error('Token is missing!');
        return;
      }
  
      await axios.delete(`${import.meta.env.VITE_BACK_URL}/admin/members/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      queryClient.invalidateQueries(['members']); // Refresh data
    } catch (error) {
      console.error('Error deleting member:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response ? error.response.data : error.message);
      }
    }
  };
  if (isLoading) {
    return <div>Loading members...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <Link to="/add-members">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              + Add Member
            </button>
          </Link>
        </div>
        {isLoading ? (
          <p className="text-center mt-5">Loading...</p>
        ) : error ? (
          <p className="text-center mt-5 text-red-500">
            Error: {error.message}
          </p>
        ) : (
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
              {members
                .filter((member) =>
                  member.firstName.toLowerCase().includes(search.toLowerCase())
                )
                .map((member) => (
                  <tr key={member._id} className="border-b">
                    <td className="p-2">{member.Id}</td>
                    <td className="p-2">
                      <img
                        src={member.pic || erick}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="p-2">{member.firstName}</td>
                    <td className="p-2">{member.age || "N/A"}</td>
                    <td className="p-2">{member.package || "N/A"}</td>
                    <td className="p-2">
                      {member.expiresOn
                        ? new Date(member.expiresOn).toLocaleDateString()
                        : "N/A"}
                    </td>
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
                      <Link to={`/admin/members/${member._id}/edit`}>
                        <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => handleDelete(member._id)}
                      >
                        <FaTrash />
                      </button>
                      <Link to={`/admin/members/${member._id}`}>
                        <FaEye className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
