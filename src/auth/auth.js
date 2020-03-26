const jwt = require('jsonwebtoken'),
    JWTKEY = process.env.JWTKEY;

const authorize = (req, res, next) => {
    let token;
   
    try {
        token = req.headers['x-access-token'] ? req.headers['x-access-token'] : req.body.token;
    } catch(err){
        res.status(401).send({ auth: false, message: 'No token provided.' });
        console.log(err)
    }
    var decoded = jwt.verify(token, JWTKEY);
    req.decodedUser = decoded.username;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, JWTKEY, (err) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    });
    next();
}

module.exports = authorize;
