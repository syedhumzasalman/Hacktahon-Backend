import doctorModel from "../Models/doctorSchema.js"
import bcrypt from "bcryptjs"



export const addDoctorController = async (request, response) => {

    try {
        const { name, specialization, email, password } = request.body
        const findDoctor = await doctorModel.findOne({ email })

        if (findDoctor) {
            response.json({
                message: "Doctor Already Exists",
                status: false,
                data: null
            })
        }

        const userPassword = password

        // if password length is less than 6 word Return ****
        if (userPassword.length < 6) {
            return response.json({
                message: "Password must be at least 6 characters long",
                status: false,
                data: null
            })
        }

        // Hashpassword using bcrypt ****
        const hashPassword = await bcrypt.hash(userPassword, 10)

        const newDoctor = await doctorModel.create({
            name,
            specialization,
            email,
            password: hashPassword
        })
        response.json({
            message: "Doctor Added Successfully",
            status: true,
            data: newDoctor
        })
    } catch (error) {
        response.json({
            message: error.message,
            status: false,
            data: null
        })
    }
}