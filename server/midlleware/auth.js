import jwt from 'jsonwebtoken';
const authMiddleware = async (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token') || req.headers?.authorization?.match(/^Bearer (.+)/)[1];

    // Check if token exists
    if (!token) {
        req.isAuth = false;
        return next();
    }

    try {
        // Verify token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.user = decoded.user;
        req.isAuth = true;
        next();
    } catch (err) {
        req.isAuth = false;
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
export default authMiddleware;
