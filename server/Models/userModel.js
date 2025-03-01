import mongoose from 'mongoose';
//I think adding google login will help and reduce time
const userSchema = new mongoose.Schema({
  profilepic:{type:String,default:"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"},
  Id: { 
    type: Number, 
    // unique: true, 
    // required: true 
  },  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
},
address: { type: String }, // Add this
password: {
  type: String,
  // default:"",
  required: true,
},
  firstName: { 
    type: String,
    required: true 
  },
  lastName: { 
    type: String, 
    // required: true 
  },
  phoneNo:{type:Number,default:9199999-99999},
  aadharNumber: { 
    type: String, 
    unique: true, 
    // required: true 
  },  // Aadhaar number for verification
  residency: { 
    type: String 
  },  
  dob: { 
    type: Date 
  },  
  age:{
    type:Number,

  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female'] 
  },  
  role: { type: String, enum: ['admin', 'member'],required:true,default:"member" },
  emergencyContact: { 
    name: { type: String },
    relationship: { type: String }, 
    number: { type: String } 
  },  
  medicalInfo: { 
    type: String 
  },  
  resetOtp: { type: String, default:''},
  resetOtpExpireAt: { type: Number, default:0},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;