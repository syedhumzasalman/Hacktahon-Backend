import express, { request, response } from "express"
import cors from "cors"
import dotenv from 'dotenv'
import authRoute from "./Routes/auth.js"
import { dbConnect } from "./Config/mongodb.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()


app.use("/api", authRoute)


app.post("/createpost", (request, response) => {
    response.json({
        message: "Post Created",
        status: true
    })
})



app.listen(PORT, () => console.log(`server running on 3000`))
