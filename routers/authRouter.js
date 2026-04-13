import { SignUp } from "../controllers/authController.js";
import express from 'express';

const router = express.Router();

router.post('/signup', SignUp);


export default router;