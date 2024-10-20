import { Application } from "../model/application.model.js";
import { Job } from "../model/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({ message: 'Job ID required', success: false });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job', success: false });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found', success: false });
        }

        if (job.position <= 0) {
            return res.status(400).json({ message: 'No positions available', success: false });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        await Job.findByIdAndUpdate(jobId, {
            $addToSet: { application: newApplication._id },
            $inc: { position: -1 }
        });

        job.application = job.application || [];
        job.application.push(newApplication._id);

        await job.save();
        return res.status(201).json({ message: 'Application submitted successfully', success: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                }
            });
        if (!applications) {
            return res.status(404).json({ message: 'No applications found', success: false });
        }

        return res.status(200).json({ applications, success: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        let job = await Job.findById(jobId)
            .populate({
                path: 'application',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'applicant',
                    select: "_id",
                    options: { sort: { createdAt: -1 } },
                }
            })
        job = job.application.filter(item => item.job)

        if (!job) {
            return res.status(404).json({ message: 'Job not found', success: false });
        }

        return res.status(200).json({ job, success: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({ message: 'Status required', success: false });
        }
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found', success: false });
        }
        application.status = status;
        await application.save();
        return res.status(200).json({ message: 'Status updated successfully', application, success: true });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}