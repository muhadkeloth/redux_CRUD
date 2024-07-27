import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';


const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin',
  };


  const authAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log('h1p1')

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });

    res.json({
        username: 'admin',
        message: 'Admin logged in successfully',
        token:token
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});



const logoutAdmin = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Admin logged out" });
};

const getAdminProfile = asyncHandler(async (req, res) => {
    res.json({
        username: ADMIN_CREDENTIALS.username,
      });
});





const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const profileImage = req.file;

    if (!profileImage) {
        return res.status(400).json({ message: 'Profile image is not added' });
      }

      const profileImagePath = `/uploads/${profileImage.filename}`;


    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        imagePath: profileImagePath,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.imagePath,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user,'req.params',req.params.id)

    if (user) {
        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        if (req.file) {
            user.imagePath = `/uploads/${req.file.filename}`;
          }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.imagePath,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authAdmin,
    logoutAdmin,
    getAdminProfile,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
};
