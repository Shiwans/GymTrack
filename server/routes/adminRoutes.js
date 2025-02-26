import express from 'express';
import { getMembers} from '../controllers/adminController.js';
import admin from '../middleware/adminAuth.js'
const adminRouter = express.Router();

adminRouter.use(admin);
adminRouter.get('/members', getMembers);


export default adminRouter;