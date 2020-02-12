const { validateAll } = require('indicative/validator');
const { sanitize } = require('indicative/sanitizer');
const { decodeToken } = require('../../util');

module.exports = {
    login: (req, res, next) => {
        const rules = {
            username: 'required|alpha',
            password: 'required|min:6'
        };

        const data = req.body;

        const messages = {
            required: field => `${field} is required`,
            'username.alpha': 'Username contains unallowed characters',
            'password.min': 'Password is too short'
        };

        validateAll(data, rules, messages)
            .then(() => next())
            .catch(e => {
                return res.status(400).send(e);
            });
    },
    login_sanitize: (req, res, next) => {
        const rules = {
            username: 'trim|lower_case',
            password: 'trim'
        };

        const data = req.body;

        sanitize(data, rules);
        next();
    },
    isAuthenticated: (req, res, next) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send({
                message: 'Token not available'
            });
        }

        try {
            decodeToken(token);
            next();
        } catch (error) {
            return res.status(400).send({
                message: 'Unauthorized access'
            });
        }
    },
    patch: (req, res, next) => {
        const rules = {
            json: 'required|object',
            patch: 'required|array'
        };

        const data = req.body;

        const messages = {
            required: field => `${field} is required`,
            'json.object': 'json field should be an object',
            'patch.array': 'patch field should be an array'
        };

        const patch = req.body.patch;
        if (patch && Array.isArray(patch)) {
            const patch_length = patch.length;
            const has = ['op', 'path', 'value'];
            let isvalid = true;
            for (let i = 0; i < patch_length; i++) {
                const keys = Object.keys(patch[i]);
                for (let j = 0; j < keys.length; j++) {
                    if (!has.includes(keys[j])) {
                        isvalid = false;
                        break;
                    }
                }
            }
            if (!isvalid) {
                return res.status(400).send({
                    message: 'invalid patch format',
                    validation: 'required',
                    field: 'patch'
                });
            }
        }

        validateAll(data, rules, messages)
            .then(() => next())
            .catch(e => {
                return res.status(400).send(e);
            });
    },
    thumbnail: (req, res, next) => {
        const rules = {
            image_url: 'required|url'
        };

        const data = req.body;

        const messages = {
            required: field => `${field} is required`,
            'image_url.url': 'Username contains unallowed characters'
        };

        validateAll(data, rules, messages)
            .then(() => next())
            .catch(e => {
                return res.status(400).send(e);
            });
    }
};
