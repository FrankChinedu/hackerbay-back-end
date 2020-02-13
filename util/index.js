const jwt = require('jsonwebtoken');
const config = require('../config/config');

const decodeToken = token => jwt.verify(token, config.secret);

const getToken = user => {
    return jwt.sign(
        {
            username: user.username
        },
        config.secret,
        {
            expiresIn: '12h'
        }
    );
};
module.exports = {
    decodeToken,
    getToken
};
