const { getToken } = require('../util');

module.exports = {
    login: async (req, res) => {
        const { body: username } = req;
        const user = { username };
        const token = getToken(user);
        return res.status(200).send({
            token
        });
    }
};
