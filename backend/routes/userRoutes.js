import express from 'express';
import upload from '../multer/multer.js'
import { authUser,
    registerUser,
    logoutUser,
    getUserprofile,
    updateUserProfile
 } from '../controllers/userController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.post('/', upload.single('profileImage'),registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserprofile)
    // .put(upload.single('profileImage'), updateUserProfile);
    .put(protect,upload.single('profileImage'), updateUserProfile);


export default router;