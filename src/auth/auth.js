const jwt = require('jsonwebtoken'),
    JWTKEY = process.env.JWTKEY;

const authorize = (req, res) => {
    let token = req.headers['x-access-token'] ? req.headers['x-access-token'] : req.body.token;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, JWTKEY, (err) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    });
}

module.exports = authorize;
