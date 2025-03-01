import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import erick from "../assets/erick.jpg";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMembers = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { authRequest } = useAuth();
  const queryClient = useQueryClient();

  const { data: lastIdData, isLoading: isLoadingId } = useQuery({
    queryKey: ["lastMemberId"],
    queryFn: async () => {
      const response = await authRequest.get("/admin/last-member-id");
      return response.data;
    },
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    id: "",
    residency: "",
    aadharNumber: "",
    phoneNumber: "",
    address: "",
    dob: "",
    gender: "",
    emergencyContact: "",
    relationship: "",
    emergencyNumber: "",
    medicalInformation: "",
    packageType: "1-month", // Default package changed to empty string
  });

  useEffect(() => {
    if (lastIdData?.lastId) {
      setFormData((prev) => ({
        ...prev,
        id: (lastIdData.lastId + 1).toString(),
      }));
    }
  }, [lastIdData]);

  const [errors, setErrors] = useState({});

  const addMemberMutation = useMutation({
    mutationFn: async (memberData) => {
      const response = await authRequest.post("/admin/members", memberData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["lastMemberId"] });
      toast.success("Member added successful!", {
        position: "bottom-right",
        theme: "light",
        transition: Slide,
        autoClose: 1000,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        id: lastIdData ? (lastIdData.lastId + 2).toString() : "",
        residency: "",
        aadharNumber: "",
        phoneNumber: "",
        address: "",
        dob: "",
        gender: "",
        emergencyContact: "",
        relationship: "",
        emergencyNumber: "",
        medicalInformation: "",
        packageType: "", // reset package type
      });
      setActiveTab("personal"); // Reset to personal tab
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage, {
        position: "bottom-right",
        theme: "colored",
        autoClose: 2000,
      });
      if (errorMessage.includes("exists")) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already in use",
        }));
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  const validate = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.residency) newErrors.residency = "Residency is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    // Validate phone number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    // Validate Aadhar
    if (
      formData.aadharNumber &&
      !/^\d{12}$/.test(formData.aadharNumber.replace(/\D/g, ""))
    ) {
      newErrors.aadharNumber = "Aadhar number must be 12 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addMemberMutation.mutate(formData);
    }
  };

  const handleNext = () => {
    if (validate()) {
      setActiveTab("membership");
    }
  };

  // Fetch memberships for the current member if editing an existing member
  // This would be added if you implement an edit feature
  // const { data: membershipData } = useQuery(
  //   ["memberships", memberId],
  //   () => fetchMemberships(memberId),
  //   { enabled: !!memberId }
  // );

  return (
    <div className="flex flex-col items-center py-10 bg-gray-200 min-h-screen">
      <div className="w-full max-w-6xl p-5 bg-white rounded-lg shadow-lg">
        <div className="flex gap-6">
          {/* Sidebar - Profile Info */}
          <div className="w-1/4 flex flex-col items-center border-r p-4">
            <div className="bg-blue-200 w-48 h-48 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={erick}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 flex gap-2 w-full">
              <button className="w-1/2 px-2 py-2 border rounded-lg text-sm">
                Upload photo
              </button>
              <button className="w-1/2 px-2 py-2 border rounded-lg text-sm">
                Take photo
              </button>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex flex-col gap-2 w-full">
              <button className="border px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                Check In
              </button>
              <button className="border px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                Prev Bookings
              </button>
              <button className="border px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                Renew
              </button>
            </div>

            {/* Membership Details */}
            <div className="mt-6 text-left w-full p-4 border rounded-md bg-gray-100">
              <h3 className="font-semibold text-lg mb-2">Membership</h3>
              <div className="space-y-1 text-sm">
                <p>Current package: - </p>
                <p className="font-semibold">-</p>
              </div>
            </div>

            {/* About Details */}
            <div className="mt-6 text-left w-full p-4 border rounded-md bg-gray-100">
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <div className="space-y-1 text-sm">
                <p>Present for - 0</p>
                <p>Joining date - {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4 p-4">
            <div className="flex justify-between items-center mb-6">
              <div className="mb-4 border-b flex gap-4">
                <button
                  className={`pb-2 px-4 ${
                    activeTab === "personal"
                      ? "border-b-2 border-blue-500 font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Details
                </button>
                <button
                  className={`pb-2 px-4 ${
                    activeTab === "membership"
                      ? "border-b-2 border-blue-500 font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab("membership")}
                >
                  Membership
                </button>
              </div>
              {activeTab === "membership" && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  onClick={handleSubmit}
                  disabled={addMemberMutation.isLoading}
                >
                  {addMemberMutation.isLoading ? "Saving..." : "Save"}
                </button>
              )}
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {/* Personal Details */}
              {activeTab === "personal" && (
                <div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className={`w-full p-2 border rounded ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className={`w-full p-2 border rounded ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Id
                      </label>
                      {isLoadingId ? (
                        <p>Loading...</p>
                      ) : (
                        <input
                          type="text"
                          name="id"
                          value={formData.id}
                          onChange={handleInputChange}
                          placeholder={isLoadingId ? "Loading..." : "Member ID"}
                          className="w-full p-2 border rounded bg-gray-100"
                          readOnly
                        />
                      )}
                      <p className="text-xs text-gray-500">Auto-generated ID</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className={`w-full p-2 border rounded ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Residency <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="residency"
                        value={formData.residency}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded bg-gray-100 ${
                          errors.residency ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Select Residency</option>
                        <option value="Shahunagar">Shahunagar</option>
                        <option value="Outside">Outside</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        note: Shahunagar or outsider
                      </p>
                      {errors.residency && (
                        <p className="text-red-500 text-xs">
                          {errors.residency}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Aadhar number
                      </label>
                      <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleInputChange}
                        placeholder="xxxx xxxx xxxx"
                        className={`w-full p-2 border rounded ${
                          errors.aadharNumber ? "border-red-500" : ""
                        }`}
                      />
                      {errors.aadharNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.aadharNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        DOB <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded bg-gray-100 ${
                          errors.dob ? "border-red-500" : ""
                        }`}
                      />
                      {errors.dob && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.dob}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="xxxxxxx7433"
                        className={`w-full p-2 border rounded ${
                          errors.phoneNumber ? "border-red-500" : ""
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded bg-gray-100 ${
                          errors.gender ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="w-full p-2 border rounded h-24"
                    />
                  </div>

                  {/* Medical Information Section */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center">
                      <span className="mr-2">🏥</span> Medical Information
                    </h2>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Emergency contact
                        </label>
                        <input
                          type="text"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                          placeholder="Name"
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Relationship
                        </label>
                        <input
                          type="text"
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleInputChange}
                          placeholder="family member"
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Medical information
                        </label>
                        <textarea
                          name="medicalInformation"
                          value={formData.medicalInformation}
                          onChange={handleInputChange}
                          placeholder="Enter any relevant medical information"
                          className="w-full p-2 border rounded h-24"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Emergency Number
                        </label>
                        <input
                          type="text"
                          name="emergencyNumber"
                          value={formData.emergencyNumber}
                          onChange={handleInputChange}
                          placeholder="Number"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
                    onClick={() => {
                      if (validate()) {
                        setActiveTab("membership");
                      }
                    }}
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Membership Details */}
              {activeTab === "membership" && (
                <div>
                  <div className="mb-6 p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">
                      Add Membership Package
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Package Type
                        </label>
                        <select
                          name="packageType"
                          value={formData.packageType}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select</option>
                          <option value="1-month">1 month (₹250.00)</option>
                          <option value="3-months">3 months (₹650.00)</option>
                          <option value="6-months">6 months (₹1200.00)</option>
                          <option value="12-months">1 year (₹2000.00)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold">
                    Current Memberships
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full mt-2 border">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Type</th>
                          <th className="p-2 text-left">Price</th>
                          <th className="p-2 text-left">Start</th>
                          <th className="p-2 text-left">End</th>
                          <th className="p-2 text-left">Status</th>
                          <th className="p-2 text-left">Visits</th>
                          <th className="p-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* For new members, this will be empty */}
                        <tr>
                          <td
                            colSpan="7"
                            className="p-4 text-center text-gray-500"
                          >
                            No active memberships yet. Save this form to create
                            a new membership.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    Historic Memberships
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full mt-2 border">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Type</th>
                          <th className="p-2 text-left">Price</th>
                          <th className="p-2 text-left">Start</th>
                          <th className="p-2 text-left">End</th>
                          <th className="p-2 text-left">Status</th>
                          <th className="p-2 text-left">Visits</th>
                          <th className="p-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* For new members, this will be empty */}
                        <tr>
                          <td
                            colSpan="7"
                            className="p-4 text-center text-gray-500"
                          >
                            No membership history
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
