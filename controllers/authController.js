import { signUpSchema } from "../middleware/validator.js";
import { doHash, compareHash } from "../utils/hashing.js";
import User from '../models/userModel.js';

export const SignUp = async (req, res)=>{
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
