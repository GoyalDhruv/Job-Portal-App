import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Job } from "../model/job.model.js"

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        const file = req.file
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false })
        }

        let profilePhoto = null;

        if (file) {
            try {
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

                if (cloudResponse) {
                    profilePhoto = cloudResponse.secure_url
                }
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ message: 'Error uploading file' });
            }
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
            role,
            profile: { profilePhoto }
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
        const { fullName, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        let skillArray;
        if (skills) skillArray = skills.split(',').map(item => item.trim());

        if (fullName) user.fullName = fullName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillArray;

        // Handle resume file upload if file exists
        if (file) {
            try {
                if (file.mimetype !== 'application/pdf') {
                    return res.status(400).json({ message: 'Only PDF files are allowed', success: false });
                }
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: 'raw'
                });
                if (cloudResponse) {
                    user.profile.resume = cloudResponse.secure_url;
                    user.profile.resumeOriginalName = file.originalname;
                }
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ message: 'Error uploading file' });
            }
        }

        await user.save();

        res.status(200).json({ user, message: "Profile updated successfully", success: true });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the profile.',
            error: error.message
        });
    }
};

// export const getProfile = async (req, res) => {
//     try {
//         const userId = req.id;
//         const user = await User.findById(userId).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: "User not found", success: false });
//         }
//         return res.status(200).json({ user, success: true });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, success: false });
//     }
// }

export const changePassword = async (req, res) => {
    try {
        const userId = req.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect current password", success: false });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match", success: false });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ user, message: "Password updated successfully", success: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const saveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const user = await User.findById(req.id);
        const alreadySaved = user.jobBookmarks.includes(jobId);

        if (alreadySaved) {
            user.jobBookmarks.pull(jobId); // Remove if already bookmarked
        } else {
            user.jobBookmarks.push(jobId); // Add if not bookmarked
        }

        await user.save();
        res.status(200).json({
            success: true,
            message: alreadySaved ? 'Removed from saved jobs' : 'Job saved successfully'
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const savedJobs = await Job.find({ _id: { $in: user.jobBookmarks } }).select('_id');
        return res.status(200).json({ savedJobs, success: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}