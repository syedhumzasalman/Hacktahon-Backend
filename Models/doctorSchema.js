import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    specialization: {
         type: String,
        required: [true, "specialization is required"]
    },
     role: {
        type: String,
        enum: ["admin", "doctor", "receptionist", "patient"],
        default: "doctor",
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Duplicate Email Address schema"],
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    

}, { timestamps: true })


const doctorModel = mongoose.model("doctor", DoctorSchema)
doctorModel.init();

export default doctorModel