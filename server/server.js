import connectDB from './config/mongodb.js';
import express from "express";
import path from "path"
import cors from "cors";
import morgan from 'morgan';
import dotenv from "dotenv";
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'
// import userRoutes from './routes/userRoutes.js'
import authenticate from './middleware/userAuth.js';


dotenv.config();

connectDB();
const app = express();
app.use(cors({
  origin: `${process.env.FRONT_URL}`, // Your frontend URL
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Accept', 'x-access-token'],

}));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(morgan("dev"));

//APT Endpoints
app.use("/auth", authRoutes);
// app.use("", authenticate, userRoutes);
app.use("/admin", adminRoutes);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
//   });

const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`listening on port:${port}`));