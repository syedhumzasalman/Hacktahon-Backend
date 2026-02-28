import jwt from "jsonwebtoken"

export const authMiddleware = (request, response, next) => {

    try {
        const PRIVATE_KEY = process.env.SECRET_KEY
        const token = request?.headers?.authorization?.split(" ")[1]
        console.log(token);

        const IsVerify = jwt.verify(token, PRIVATE_KEY)
        // console.log("IsVerify", IsVerify);

        if (IsVerify._id) {
            next()
        } else {
            response.json({
                message: "UnAuth User",
                status: false
            })
        }
    } catch (error) {
        response.json({
            message: "UnAuth User",
            status: false
        })
    }


}
