import { signUp, signIn, signOut } from "../controllers/authController.js";
import express from 'express';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn );
router.post('/signOut', signOut );



export default router;