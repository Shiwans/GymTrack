import express from 'express';
import { logout, loginUser,sendResetOtp, resetPassword } from '../controllers/authController.js';

const authRoutes = express.Router();
authRoutes.post('/login', loginUser);
authRoutes.post('/logout', logout);
authRoutes.post('/send-email', sendResetOtp);
authRoutes.post('/set-password', resetPassword);

export default authRoutes;