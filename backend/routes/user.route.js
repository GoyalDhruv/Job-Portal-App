import express from 'express';
import { login, logout, register, UpdateProfile } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile/update').post(isAuthenticated, UpdateProfile)
router.route('/logout').post(isAuthenticated, logout)
export default router;