import { Router } from "express"
import { upload, uploadPhoto, removePhoto } from "../controllers/photoController.js"
import userController from '../controllers/userController.js'
import coupleController from "../controllers/coupleController.js"
import paymentController from "../controllers/paymentController.js"
import emailController from "../controllers/emailController.js"

const api = Router()

//User
api.post('/users/sign-up', userController.signUp)
api.post('/users/sign-in', userController.signIn)
api.get('/users/get-user-by-id/:id', userController.getUserById)
api.post('/users/save-settings', userController.saveSettings)

//Photos
api.post('/users/upload-photo', upload.single('file'), uploadPhoto)
api.post('/users/remove-photo', removePhoto)

//couple
api.post('/users/couple/create-description', coupleController.createDescription)
api.post('/users/couple/register-couple', coupleController.registerCouple)

//payment
api.post('/create-checkout-intent', paymentController.createPaymentLink)

//Email
api.post('/send-email', emailController.sendEmail)

export default api