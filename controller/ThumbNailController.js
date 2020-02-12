const request = require('request-promise');
const fs = require('fs')
const imageThumbnail = require('image-thumbnail')
module.exports = {
    createThumbNail: async (req, res) => {
        const {body: {image_url}}  = req;
        const filename = Date.now();
        const img_path = `public/images/file-${filename}.jpg`;
        request({
            uri: image_url,
            method: 'get',
            json: true}, (error) => {
                if(error) {
                    return res.status(500).send({
                        message: 'Something went wrong'
                    })
                }
            }).pipe(fs.createWriteStream(img_path, {flags: 'w+'})).on('close', async function() {
                const thumbnail = await imageThumbnail(img_path, {width: 50, height: 50 });
                const thumb_path = `public/thumbnail/file-${filename}.jpg`;
                fs.writeFileSync(thumb_path, thumbnail);
                res.writeHead(200, {
                    'Content-Type': 'image/jpg'
                })
                const readStream = fs.createReadStream(thumb_path);
                readStream.pipe(res);
            })
    }
};