import { Post } from "../models/postModel.js";
import User from "../models/userModel.js";


export const toggleFollow = async(req, res)=>{
    try {
        //making sure a user cannot follow himself
        if(req.user === req.params.id){
            return res.status(400).json({
                success: false,
                message: "Bad request, You cannot follow yourself!"
            });
        }

        //getting the target and the user making the follow/unfollow request

        const targetUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user);

        //cheking if target user and current user both exist in the db

        if(!currentUser ||  !targetUser){
            return res.status(404).json({
                message: "User not found"
            });
        }

        //if they exist, check if we already follow him..
        const followingList = currentUser.following || []
        const isFollowing = followingList.includes(req.params.id);

        if(isFollowing){
            await currentUser.updateOne({$pull: {following: req.params.id}});
            await targetUser.updateOne({$pull: {followers: req.user}});
            res.status(200).json({
                success: true,
                message:"User unfollowed successfully"
            });
        } else {
            await currentUser.updateOne({$push:{following: req.params.id}});
            await targetUser.updateOne({$push:{followers: req.user}});
            res.status(200).json({
                success: true,
                message: "User followed successfully"
            });
        }
    } catch (error) {
        console.log("Error toggling follow: ", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
        
    }
};

export const getUserProfile = async(req, res)=> {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            return res.status(404).jsonn({
                success: false,
                message: "User not found"
            });
        }
        
        const post = await Post.find({user:req.user})
            .sort({createdAt:-1})
            .populate('user', 'username email')
            .populate('comments.user', 'username');

        res.status(200).json({
            success: true,
            user,
            post
        });

    } catch (error) {
        console.log("Error fetching User Profile:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};