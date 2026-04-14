import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: [true, 'Username must be unique!'],
        minLength: [3, 'Username must have at least 3 characters'],
    },
    email:{
        type: String,
        required: [true, 'Email is required1'],
        trim: true,
        unique:[true, 'Email must be unique!'],
        minLength:[5, 'Email must have at least 5 characters'],
        lowercase: true,
    },
    password:{
        type:String,
        required:[true, 'Password must be provided!'],
        trim:true,
        select:false,
    },
},
    {
        timestamps: true
    },
);

const User = mongoose.model('User', userSchema);
export default User;