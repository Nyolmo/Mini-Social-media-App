import { createPost, toggleLike } from "../controllers/postController.js";
import express from 'express';
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post('/create-post',protect, createPost);
router.put('/:id/like', protect, toggleLike);

export default router;