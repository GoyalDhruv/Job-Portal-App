import express from 'express';
import { login, logout, register, UpdateProfile, changePassword } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { singleUpload } from '../middleware/multer.js';

const router = express.Router()

router.route('/register').post(singleUpload, register)
router.route('/login').post(login)
// router.route('/profile').get(isAuthenticated, getProfile)
router.route('/profile/update').put(isAuthenticated, singleUpload, UpdateProfile)
router.route('/logout').post(isAuthenticated, logout)
router.route('/changePassword').post(isAuthenticated, changePassword)

export default router;