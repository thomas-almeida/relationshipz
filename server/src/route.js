import { Router } from "express"
import { upload, uploadPhoto } from "../controllers/photoController.js"
import userController from '../controllers/userController.js'
import coupleController from "../controllers/coupleController.js"

const api = Router()

//User
api.post('/users/sign-up', userController.signUp)
api.post('/users/sign-in', userController.signIn)
api.get('/users/get-user-by-id/:id', userController.getUserById)
api.post('/users/save-settings', userController.saveSettings)

//upload
api.post('/users/upload-photo', upload.single('file'), uploadPhoto)

//couple
api.post('/users/couple/create-description', coupleController.createDescription)
api.post('/users/couple/register-couple', coupleController.registerCouple)

export default api