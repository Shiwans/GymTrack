import User from "../Models/userModel.js";
import Membership from "../Models/membershipModel.js";
import bcrypt from "bcryptjs";

export const getMembers = async (req, res) => {
  try {
    const members = await User.find();
    if (members.length === 0) {
        // console.error("No Members found");
        return res.status(404).json({ message: "No Members found" });
      }
  
      res.status(200).json({ message: "Members fetched", members });
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({ message: "Unable to fetch members", error });
    }
};

export const addMember = async (req, res) => {
  try {
    const {
      firstName, lastName, email, phoneNumber, age, packageType, memberId,
      residency, aadharNumber, address, dob, gender,
      emergencyContact, relationship, emergencyNumber, medicalInformation
    } = req.body;

    if (!packageType) {
      return res.status(400).json({ message: "Membership package is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Member already exists!" });
    }

    const lastUser = await User.findOne().sort({ Id: -1 });
    const newMemberId = lastUser ? lastUser.Id + 1 : 19205;
    const finalId = memberId || newMemberId;
    const defaultPassword = "Member" + finalId;

    // Hash the password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10); // 10 is the salt rounds

    const newMember = new User({
      Id: finalId,
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
      phoneNo: phoneNumber,
      age,
      role: "member",
      residency,
      aadharNumber,
      address,
      dob,
      gender,
      emergencyContact: {
        name: emergencyContact,
        relationship,
        number: emergencyNumber,
      },
      medicalInfo: medicalInformation,
    });

    await newMember.save();

    // Create Membership Document
    const membership = new Membership({
      userId: newMember._id,
      // membershipType: packageType.replace(" ", "-"),
      startDate: new Date(),
    });
    membership.setEndDate();
    await membership.save();

    res.status(201).json({ message: "Member added successfully", newMember });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Error adding member", error: error.message });
  }
};
// ✅ Fetch Last Member ID
export const getLastMemberId = async (req, res) => {
  try {
    const lastUser = await User.findOne().sort({ Id: -1 });
    const lastId = lastUser ? lastUser.Id : 19205; // Default to 19205 if no users exist
    res.json({ lastId });
  } catch (error) {
    res.status(500).json({ message: "Error fetching last ID", error });
  }
};
