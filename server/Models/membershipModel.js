import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User collection

    startDate: {
      type: Date,
      required: true,
      default: () => new Date(), // Default to today
    },
    endDate: {
      type: Date,
      required: true,
    },
    membershipType: {
      type: String,
      enum: ["1-month", "2-months", "6-months", "12-months"],
      required: true,
      default:"1-month"
    },
    isActive: {
      type: Boolean,
      default: true,
    }, // Auto-updated when membership expires
    membershipHistory: [
      {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        duration: { type: Number }, // Duration in days
        status: { type: String, default: "expired" },
      },
    ],
  },
  { timestamps: true }
);

// Auto-set endDate before saving
membershipSchema.pre("save", function (next) {
  if (!this.endDate) {
    this.setEndDate();
  }
  next();
});

// Function to set end date based on membership type
membershipSchema.methods.setEndDate = function () {
  const startDate = new Date(this.startDate);
  let endDate;

  // Define end date based on membership type
  switch (this.membershipType) {
    case "1-month":
      endDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
      break;
    case "2-month":
      endDate = new Date(startDate.setMonth(startDate.getMonth() + 2));
      break;
    case "6-month":
      endDate = new Date(startDate.setMonth(startDate.getMonth() + 6));
      break;
    case "12-month":
      endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
      break;
    default:
      throw new Error("Invalid membership type");
  }

  this.endDate = endDate;
};

// Function to check and update expired memberships
membershipSchema.statics.updateMembershipStatus = async function () {
  const today = new Date();

  // Find memberships that have expired but are still marked as active
  const expiredMemberships = await this.find({
    endDate: { $lt: today },
    isActive: true,
  });

  for (let membership of expiredMemberships) {
    // Move to history
    membership.membershipHistory.push({
      startDate: membership.startDate,
      endDate: membership.endDate,
      duration: Math.ceil(
        (membership.endDate - membership.startDate) / (1000 * 60 * 60 * 24)
      ), // Convert to days
      status: "expired",
    });

    // Mark as inactive
    membership.isActive = false;
    await membership.save();
  }

  console.log(`${expiredMemberships.length} memberships updated.`);
};


const Membership  = mongoose.model("Membership", membershipSchema);
export default Membership;