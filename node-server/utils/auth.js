const jwt = require('jsonwebtoken');
const dbconfiq = require("../config/db-config");



exports.generateToken = (username) => {
    const accessTokenSecret = dbconfiq.accessTokenSecret;
    const accessToken = jwt.sign({ username: username }, accessTokenSecret);

    return accessToken;
};

exports.authenticateJWT = (req, res, next) => {
    const accessTokenSecret = dbconfiq.accessTokenSecret;
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const authToken = authHeader.split(' ')[1];

        jwt.verify(authToken, accessTokenSecret, (err, user) => {
            if (err) {
                res.status(403).send({
                    message: err.message
                });
                return;
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
