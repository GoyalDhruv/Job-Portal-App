import { Job } from "../model/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !jobType || !experience || !location || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            experienceLevel: experience,
            location,
            jobType,
            position,
            company: companyId,
            created_by: userId
        })

        return res.status(201).json({
            message: "Job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}


// export const getJobs = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || "";
//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: 'i' } },
//                 { description: { $regex: keyword, $options: 'i' } }
//             ]
//         };

//         const jobs = await Job.find(query).populate({
//             path: 'company'
//         }).sort({ createdAt: -1 });

//         if (!jobs)
//             return res.status(404).json({
//                 message: "No jobs found.",
//                 success: false
//             });

//         return res.status(200).json({
//             message: "Jobs fetched successfully.",
//             jobs,
//             success: true
//         });

//     } catch (error) {
//         return res.status(500).json({ message: error.message, success: false });
//     }
// }

export const getJobs = async (req, res) => {
    try {
        const { location, industry, salary, search } = req.query;

        let query = {};

        if (location) {
            query.location = location;
        }

        if (salary) {
            query.salary = { $gte: parseInt(salary, 10) };
        }

        if (industry) {
            query.$or = [
                { title: { $regex: industry, $options: 'i' } },
                { description: { $regex: industry, $options: 'i' } }
            ];
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const jobs = await Job.find(query)
            .populate({
                path: 'company',
            })
            .sort({ createdAt: -1 });


        if (!jobs.length) {
            const allJobs = await Job.find();
            return res.status(404).json({
                message: "No jobs found.",
                allJobs,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Jobs fetched successfully.",
            jobs,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) return res.status(404).json({
            message: "No jobs found.",
            success: false
        })
        return res.status(200).json({
            message: 'Jobs fetched successfully',
            job,
            success: true
        });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company'
        });
        if (!jobs) return res.status(404).json({
            message: 'No jobs found',
            success: false
        });

        return res.status(200).json({
            message: 'Jobs fetched successfully',
            jobs,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const jobId = req.params.id;

        if (!title || !description || !requirements || !salary || !jobType || !experience || !location || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        let job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        job.title = title;
        job.description = description;
        job.requirements = requirements;
        job.salary = salary;
        job.location = location;
        job.jobType = jobType;
        job.experienceLevel = experience;
        job.position = position;
        job.company = companyId;

        await job.save();

        return res.status(200).json({
            message: "Job updated successfully.",
            success: true,
            job
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

