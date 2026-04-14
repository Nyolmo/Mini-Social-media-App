import { createPost } from "../controllers/postController.js";
import express from 'express';
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post('/create-post',protect, createPost);

export default router;