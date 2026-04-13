import { signUpSchema, signInSchema } from "../middleware/validator.js";
import { doHash, compareHashValidation } from "../utils/hashing.js";
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res)=>{
    const { email, password}=req.body;
    try {
        const { error } = signUpSchema.validate({
            email, password
        });

        if(error){
            return res.status(401).json({
                success:false,
                message: error.details[0].message
            });
        };

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "A User already exists"
            });
        }

        const hashedPassword = await doHash(password, 12);
        const newUser = new User({
            email, password: hashedPassword
        });

        const result = await newUser.save();
        result.hashedPassword = undefined;

        return res.status(201).json({
            success: true,
            message: "User account created successfully!",
            result

        });

        
    } catch (err) {
        console.log(`Error creating User :`, err.message);
        res.status(500).json({
            success: false,
            message: err.message

        });

        
    }
};

export const signIn = async(req, res)=>{
    const { email, password } = req.body;
    try {
        const { error } = signInSchema.validate({email, password});
        if(error){
            return res.status(401).json({
                success: false,
                error: error.details[0].message
            });
        }

        const existingUser = await User.findOne({email}).select('+password');

        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User does not exist!"
            });
        }

        const isValid = await compareHashValidation(password, existingUser.password);

        if(!isValid){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({
            userId: existingUser._id,
            email:existingUser.email
        },
        process.env.TOKEN_SECRET,
        { expiresIn:'8h'}
    );

    res.cookie('Authorization', 'Bearer ' + token,
        {
            expires: new Date(Date.now() + 8 * 3600000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }).json({
            success: true,
            token,
            message: "Logged in successfully",
        });


        
    } catch (err) {
        console.log("Error logging in User:", err.message);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        
    }
};

export const signOut = async(req, res)=>{
    res.clearCookie('Authorization')
        .status(200)
        .json({
            success: true,
            message: "Logged out successfully"
        });
}