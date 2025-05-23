import mongoose from 'mongoose'

const connectDB =async () =>{
    try {
     
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB or updating data:", error);
    }
}

export default connectDB;