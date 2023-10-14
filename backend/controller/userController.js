const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')


//@desc Register User
//@Route POST /api/user
//@access public
const registerUser = asyncHandler(async(req,res)=>{

    const {name,email,password} =req.body
    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error('Please add all feilds')
    }

    // user already exists
    const userExists = await User.findOne({email})
    if(userExists)
    {
        res.status(400)
        throw new Error('user already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201)
        res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})
//@desc login User
//@Route get /api/user/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user){
        if( await bcrypt.compare(password,user.password)){
            res.status(201)
            res.json({
                id:user.id,
                name:user.name,
                email:user.email,
                token:generateToken(user.id)
            })
        }
        else{
            res.status(400)
            throw new Error('invalid password')
        }
    }
    else{
        res.status(400)
        throw new Error('invalid email')
    }
})
//@desc GET User
//@Route GET /api/user/me
//@access Private
const getMe = asyncHandler(async(req,res)=>{

     
     res.status(201).json(req.user)
         
})

// generate JWT

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}
module.exports = {
    registerUser,
    loginUser,
    getMe
}