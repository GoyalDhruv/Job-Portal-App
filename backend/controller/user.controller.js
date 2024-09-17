import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists.", success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })

        return res.status(201).json({ message: "Account created successfully.", success: true })
    }
    catch (error) {
        return res.status(400).json({ message: error.message, success: false })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Incorrect email or password", success: false })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect email or password", success: false })
        }
        // checking for role 
        if (role !== user.role) {
            return res.status(401).json({ message: "Account does not exists with the current role", success: false })
        }

        const tokendata = {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        }

        const token = jwt.sign(tokendata, process.env.JWT_SECRET, { expiresIn: "1d" });

        user = {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie('token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        }).json({ user, message: `Welcome back ${user.fullName}`, success: true })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 })
            .json({ message: "Logged out successfully", success: true })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const UpdateProfile = async (req, res) => {
    try {
        const { fullname, phoneNumber, bio, skills } = req.body;
        // const file = req.file;

        // if (!fullname || !phoneNumber || !bio || !skills) {
        //     res.status(400).json({ message: "All fields are required.", success: false })
        // }

        // cloudinary implementation for resume

        let skillArray;
        if (skills) skillArray = skills.split(',')

        const userId = req.id // middleware authentication
        let user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false })
        }


        // updating data
        if (fullname) user.fullName = fullname
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillArray

        // resume will be implmented later on

        await user.save();

        res.status(200).json({ user, message: "Profile updated successfully", success: true })

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the profile.',
            error: error.message
        });
    }
}