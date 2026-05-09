const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

    try {

        let token;

        // token from headers
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = decoded;

            next();

        }
        else {

            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            });

        }

    }
    catch (error) {

        res.status(401).json({
            success: false,
            message: "Token failed"
        });

    }
};

const admin = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            success: false,
            message: "Admin access only"
        });

    }

    next();
};

module.exports = {
    protect,
    admin
};