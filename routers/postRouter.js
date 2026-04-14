import { createPost, toggleLike, addComment } from "../controllers/postController.js";
import express from 'express';
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post('/create-post',protect, createPost);
router.put('/:id/like', protect, toggleLike);
router.put('/:id/comment', protect, addComment);

export default router;