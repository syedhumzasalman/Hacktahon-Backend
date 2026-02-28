import jwt from "jsonwebtoken";

export const adminMiddleware = (req, res, next) => {
    try {
        const PRIVATE_KEY = process.env.SECRET_KEY
        const token = req?.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
                status: false
            });
        }

        const decoded = jwt.verify(token, PRIVATE_KEY);
        // console.log("Decoded Token:", decoded);

        // Check if token has valid _id
        if (!decoded._id) {
            return res.status(401).json({
                message: "Unauthorized user",
                status: false
            });
        }

        // Check if role is admin
        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admins only.",
                status: false
            });
        }

        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({
            message: "Unauthorized user",
            status: false
        });
    }
};