import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    website: String,
    location: String,
    logo: String, // Url of Company logo
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{timestamps:true})