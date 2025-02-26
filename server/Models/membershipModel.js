const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },  // Reference to User collection

  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  membershipType: { 
    type: String, 
    enum: ['1-month', '2-month', '6-month', '12-month'], 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },  // Auto-updated when membership expires
  membershipHistory: [{
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: Number }, // Duration in days
    status:{type:String,default:"false"},
  }],
}, { timestamps: true });

// Middleware to check and update membership status
membershipSchema.pre('save', async function (next) {
  const today = new Date();
  
  // If the membership has expired
  if (this.endDate < today) {
    this.isActive = false; // Mark it as inactive
    
    // Move the expired membership to history
    this.membershipHistory.push({
      startDate: this.startDate,
      endDate: this.endDate,
      duration: Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24)), // Convert to days
      status:"expired",
    });

    // Reset current membership dates since it's expired
    this.startDate = null;
    this.endDate = null;
  }

  next();
});

// Function to set end date based on membership type
membershipSchema.methods.setEndDate = function () {
  const startDate = new Date(this.startDate);
  let endDate;

  // Define end date based on membership type
  switch (this.membershipType) {
    case '1-month':
      endDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
      break;
    case '2-month':
      endDate = new Date(startDate.setMonth(startDate.getMonth() + 2));
      break;
    case '6-month':
      endDate = new Date(startDate.setMonth(startDate.getMonth() + 6));
      break;
    case '12-month':
      endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
      break;
    default:
      throw new Error('Invalid membership type');
  }

  this.endDate = endDate;
};

module.exports = mongoose.model('Membership', membershipSchema);
