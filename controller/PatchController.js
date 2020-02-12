const jsonpatch = require('jsonpatch');
module.exports = {
    patch: async (req, res) => {
        const {body: {json, patch}}  = req;
        try {
            const result = jsonpatch.apply_patch(json, patch)
            return res.status(200).send({
                data: result
            });       
        } catch (error) {
            return res.status(500).send({
                message: error.message
            })
        }
    }
};