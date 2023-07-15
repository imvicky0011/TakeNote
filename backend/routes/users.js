import express from 'express'
import {register, login, logout, getMe, updateDetails, updatePassword, deleteUser} from '../controllers/userController.js'
import authorize from '../middleware/auth.js'
import { loginRules, registerRules, updateDetailsRules, updatePasswordRules } from '../middleware/validator.js'
import { validateResults } from '../middleware/validationResults.js'

const router = express.Router()

router.post("/register", registerRules, validateResults, register)

router.post('/login', loginRules, validateResults, login)

router.get('/logout', authorize ,logout)

router.get("/me", authorize, getMe);

router.put('/updateDetails', authorize, updateDetailsRules, validateResults, updateDetails)

router.put('/updatePassword', authorize, updatePasswordRules, validateResults, updatePassword)

router.delete('/delete', authorize, deleteUser)

export default router