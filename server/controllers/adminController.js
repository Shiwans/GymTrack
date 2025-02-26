import User from "../Models/userModel.js";

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