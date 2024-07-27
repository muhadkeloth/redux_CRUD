import express from 'express';
import { 
    authAdmin, 
    getAdminProfile,  
    logoutAdmin, 
    getAllUsers, 
    createUser, 
    deleteUser, 
    updateUser 
} from '../controllers/adminController.js';
import upload from '../multer/multer.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login',(req,res,next)=> {
    console.log('post/admin login')
    next();
} ,authAdmin);
router.post('/logout', logoutAdmin);

router
    .route('/profile')
    .get(protectAdmin, getAdminProfile)

router.route('/use')
    .get(protectAdmin, getAllUsers)
    .post(protectAdmin, upload.single('profileImage'), createUser);

router.route('/use/:id')
.put(protectAdmin, updateUser)
.delete(protectAdmin, deleteUser);

export default router;
