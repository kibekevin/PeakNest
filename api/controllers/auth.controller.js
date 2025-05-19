import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
        return next(errorHandler(400, 'All fields are required'));
    }

    if (password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters'));
    }

    if (username.length < 3) {
        return next(errorHandler(400, 'Username must be at least 3 characters'));
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(errorHandler(400, 'Invalid email format'));
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return next(errorHandler(400, 'Email already exists'));
            }
            if (existingUser.username === username) {
                return next(errorHandler(400, 'Username already exists'));
            }
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword 
        });
        
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error('Signup error:', error);
        next(errorHandler(500, 'Error creating user'));
    }
};


export const signin = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const validUser = await User.findOne({email:email}) 
        if (!validUser) {
            return next(errorHandler(404, 'User not found!'))
        };
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'wrong credentials!'))
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password:pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest)
    } catch (error) {
        next(error);
    }
}




export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const { password:pass, ...rest } = user._doc;
            res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);

        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password:pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);

        }

    } catch (error) {
        next(error)
    }
}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("User has been logged out");
    } catch (error) {
        next(error);
    }
}
