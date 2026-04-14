import express from'express';
import { toggleFollow, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();;

router.put('/:id/follow', protect, toggleFollow);
router.get('/:id', protect, getUserProfile);

export default router;