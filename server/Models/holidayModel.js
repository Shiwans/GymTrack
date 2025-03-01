import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true 
  },
  reason: { 
    type: String, 
    required: true 
  }, 
  shift:{type:String,  enum: ['morning', 'evening','both'],required:true}
}, { timestamps: true });

const Holiday  =mongoose.model('Holiday', holidaySchema);
export default Holiday;