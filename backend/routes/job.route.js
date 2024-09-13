import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { getAdminJob, getJobById, getJobs, postJob } from '../controller/job.controller.js';

const router = express.Router()

router.route('/post').post(isAuthenticated, postJob)
router.route('/get').get(isAuthenticated, getJobs)
router.route('/get/:id').get(isAuthenticated, getJobById)
router.route('/getadminjobs').get(isAuthenticated, getAdminJob)
export default router;