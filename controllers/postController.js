import { Post } from "../models/postModel.js";

export const createPost = async(req, res)=>{
    const { content } = req.body;
    try {
        if(!content){
            return res.status(400).json({
                success: false,
                message: "Please add some content to your post"
            });
        }
        console.log("Who is the user?: ", req.user);

        const post = await Post.create({
            content, user: req.user
        });
        
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });

        
    } catch (error) {
        console.log("Error while creating post:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
                
    }
};

