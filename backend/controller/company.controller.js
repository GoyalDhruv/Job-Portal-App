import { Company } from '../model/company.model.js'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany = async (req, res) => {
    try {
        const { name, description, location, website } = req.body;
        const file = req.file
        if (!name) {
            return res.status(400).json({ message: "Company name is required.", success: false })
        }

        let company = await Company.findOne({ name })
        if (company) {
            return res.status(400).json({ message: "Company name already exists.", success: false })
        }

        let logo = null;

        if (file) {
            try {
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

                if (cloudResponse) {
                    logo = cloudResponse.secure_url
                }

            } catch (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ message: 'Error uploading file' });
            }
        }

        company = await Company.create({
            userId: req.id,
            name,
            description,
            location,
            website,
            logo
        })

        return res.status(201).json({
            message: "Company created",
            company,
            success: true
        })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id
        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).jso({ message: "Companies not found", message: false })
        }

        return res.status(200).json({ companies, success: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id

        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(404).json({ message: "Company not found", success: false })
        }

        return res.status(200).json({ company, success: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id
        const { name, description, website, location } = req.body
        const file = req.file

        // cloudinary

        let logo = null;
        if (file) {
            try {
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

                if (cloudResponse) {
                    logo = cloudResponse.secure_url
                }

            } catch (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ message: 'Error uploading file' });
            }
        }

        const updateDate = { name, description, website, location, logo }

        // let checkExitingCompany = await Company.findOne({ name })
        // if (checkExitingCompany) {
        //     return res.status(400).json({ message: "Company name already exists.", success: false })
        // }

        const company = await Company.findByIdAndUpdate(companyId, updateDate, { new: true })

        if (!company) {
            return res.status(404).json({ message: 'Company not found', success: false });
        }


        return res.status(200).json({
            message: 'Company updated successfully',
            company,
            success: true
        });

    } catch (error) {
        console.error('Error updating company:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the company.',
            error: error.message
        });
    }
}