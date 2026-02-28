import express from "express"
import { addDoctorController } from "../Controller/admin.js"
import { adminMiddleware } from "../Middleware/admin.js"


const adminRoute = express.Router()


adminRoute.post("/admin/add-doctor", adminMiddleware, addDoctorController)







export default adminRoute