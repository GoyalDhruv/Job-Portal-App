import { Company } from '../model/company.model.js'

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required.", success: false })
        }

        let company = await Company.findOne({ name: companyName })
        if (company) {
            return res.status(400).json({ message: "Company name already exists.", success: false })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
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

        const updateDate = { name, description, website, location }

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