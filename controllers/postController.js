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


export const toggleLike =  async(req, res)=> {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if(post.likes.includes(req.user)){
            post.likes.pull(req.user);
        } else{
            post.likes.push(req.user);
        };

        await post.save();
        return res.status(200).json(post.likes);
    } catch (error) {
        console.log("Error liking the post:", error.message);
        return res.status(500).json({
            message:"Server error",
            error: error.message
        });        
    }
};
