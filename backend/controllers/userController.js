import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Todo from '../models/Todo.js'
import User from '../models/User.js'

export const register = async (req, res) => {
    const {name, email, password, age} = req.body

    try {
        let user = await User.findOne({email});
        if(user) {
            console.log(user)
            return res.status(400).json({
                msg: "User ALready Exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user = new User({
            name, 
            email, 
            password: hashPassword, 
            age,
        })
        await user.save()

        //whenever i create, the mongoDB assigns an unique _id to every user
        const payload = {
            user: user._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 360000});

        res.cookie("token", token, {httpOnly: true, expiresIn: 360000})
        
        //...rest is the spread operator, in this situation
        //we want to send back the user credentials, but not password
        //that is why, we are storing every details in the "rest" apart from password
        const {password: pass, ...rest} = user._doc

        res.status(201).json({
            msg: "User Created Successfully", 
            user: rest
        })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({
            error: err,
            msg: "Internal Server Error"
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({'email' : email})
        if(!user) {
            return res.status(404).json({
                msg: "User does not exists"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({
                msg: "User Credentials did not match, please enter valid details"
            })
        }

        const payload = {
            user: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000
        })

        res.cookie("token", token, {httpOnly: true, expiresIn: 360000})
        
        const {password: pass, ...rest} = user._doc

        res.status(200).json({
            msg: "User Logged in Successfully",
            user: rest,
            token: token
        })
        console.log("Token generated and sent to the client side")
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
            msg: "Internal Server Error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            msg: "User Logged Out Successfully"
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
            msg: "Internal Server Error"
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if(!user) {
            return res.status(404).json({
                msg: "User Not Found!"
            })
        }

        const {password: pass, ...rest} = user._doc
        return res.status(200).json({msg: "User Found", user: rest})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
            msg: "Internal Server Error"
        });
    } 
}

export const updateDetails = async (req, res) => {
    //these are the details i want to update,
    //so, whats happening is, I have a user logged in, okay!
    //and they are trying to update their details by sending
    //a new set of details through the request body
    const {name, email, age} = req.body;
    //so these are the new details, that are supposted to be updated
    try {
        let user = await User.findById(req.user);
        if(!user) {
            return res.status(404).json({msg: 'User Not Found!'});
        }
        console.log("My User: " + user.name + ", " + user.email);
        let exists = await User.findOne({email});
        if(exists && exists._id.toString() !== user._id.toString()) {
            return res.status(404).json({msg: 'Email already exists'});
        }
        user.name = name;
        user.email = email;
        user.age = age;
        
        console.log("so far good innit??");
        
        await user.save();

        console.log("Updated Details: " + user.name + ", " + user.email);
        
        const {password: pass, ...rest} = user._doc;
        
        return res.status(200).json({
            msg: "User Updated Successfully",
            user: rest
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: err.message,
            msg: "Internal Server Error"
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if(!user) {
            return res.status(404).json({
                msg: "User Not Found!"
            })
        }

        
        console.log("here i am")
        //before deleting the user, you have to delete all the
        //todos associated with the particular user.
        const todo = await Todo.find({user: req.user})
        if(todo) {
            await Todo.deleteMany({user: req.user})
        }

        console.log("here i not am")
        
        //while deleting the user from the current window,
        //clear the cookie from the client side as well

        res.clearCookie("token")

        await user.deleteOne();
        res.status(200).json({msg: "User Deleted Successfully"})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
            msg: "Internal Server Error"
        })
    }
}

export const updatePassword = async (req, res) => {
    const {password, newPassword} = req.body;
    try {
        let user = await User.findById(req.user)
        if(!user) {
            return res.status(400).json({
                msg: "User Does Not Exists!"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                msg: "Invalid Credentials"
            })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)
        await user.save()
        const {password: pass, ...rest} = user._doc
        return res.status(200).json({
            user: rest,
            msg: "Password Updated Successfully!"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
            msg: "Internal Server Error!"
        })
    }
}

