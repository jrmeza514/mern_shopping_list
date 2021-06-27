const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check Token
    if (!token) return res.status(401).json({ msg: "No Token, authorization denied" });

    try {
        //Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Add User Form Payload
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ msg: "Token is invalid" });
    }

}

module.exports = auth;