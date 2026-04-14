import mongoose from "mongoose";
import User from "./userModel.js";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, "Comment Text is required"],
        trim: true,
        maxLength:[500, "Comment text should not exceed 500  characters"]
    },
},
{
    timestamps:true
}

);

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    content:{
        type:String,
        required: [true, "Post content is required"],
        trim:true,
        maxLength: [200, "Post content should not exceed 200 characters"]
    },
    likes: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [commentSchema],
},
{
    timestamps: true
});

export const Post = mongoose.model('Post', postSchema);
