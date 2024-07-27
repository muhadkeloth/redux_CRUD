import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


const authUser = asyncHandler (async (req, res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);

        res.json({
            _id:user._id,
            name: user.name,
            email:user.email,
            image:user.imagePath
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }

});

const registerUser = asyncHandler (async (req, res) => {
    const {name,email,password} = req.body;
     const profileImage = req.file;

     if(!profileImage){
        return res.status(400).json({message:"Profile is not added"})
     }

     const profileImagePath = `/uploads/${profileImage.filename}`;
    
    const userExists = await User.findOne({email});
    console.log('helllo userExists',userExists)
    
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }


    const user = await User.create({
        name,
        email,
        password,
        imagePath:profileImagePath
    });

    if(user){
        generateToken(res,user._id);

        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            image:user.imagePath
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }

});

const logoutUser =  (req, res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message: "Logout User"})
};

const getUserprofile= asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        console.log('getUserprofile')
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            image:user.imagePath
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }


        if (req.file) {
            user.imagePath = `/uploads/${req.file.filename}`;
        }


        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            image:updatedUser.imagePath
        })
    }else{
        res.status(404);
        throw new Error('User not found')
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserprofile,
    updateUserProfile
}