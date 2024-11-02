import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { getAdminJob, getJobById, getJobs, postJob, updateJob } from '../controller/job.controller.js';

const router = express.Router()

router.route('/post').post(isAuthenticated, postJob)
router.route('/get').get(getJobs)
router.route('/get/:id').get(isAuthenticated, getJobById)
router.route('/getadminjobs').get(isAuthenticated, getAdminJob)
router.route('/update/:id').put(isAuthenticated, updateJob)
export default router;