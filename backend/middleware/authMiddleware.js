import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from  '../models/userModel.js'

const protect = asyncHandler(async (req,res,next) => {
  console.log('protect')
  let token;
  
  token = req.cookies.jwt;
  
  console.log('protect1',req.cookies)
    if(token){
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        }catch(error){
            res.status(401);
            throw new Error('Not authorized,invalid token')
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no token protect ')
    }
})


const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;
  // console.log(req.headers)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        console.log('token',token)
        console.log('token1',token[0])
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded',decoded)
  
        if (decoded.username === 'admin') {
          req.admin = decoded;
          next();
        } else {
          res.status(401);
          throw new Error('Not authorized as an admin');
        }
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no  token');
    }
  });


export {protect,protectAdmin  }