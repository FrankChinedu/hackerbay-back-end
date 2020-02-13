const request = require('request-promise');
const fs = require('fs');
const imageThumbnail = require('image-thumbnail');

module.exports = {
    createThumbNail: async (req, res) => {
        const {
            body: { imageUrl }
        } = req;
        const filename = Date.now();
        const imagePath = `public/images/file-${filename}.jpg`;
        request(
            {
                uri: imageUrl,
                method: 'get',
                json: true
            },
            error => {
                if (error) {
                    return res.status(500).send({
                        message: 'Something went wrong'
                    });
                }
            }
        )
            .pipe(fs.createWriteStream(imagePath, { flags: 'w+' }))
            .on('close', async function() {
                const thumbnail = await imageThumbnail(imagePath, {
                    width: 50,
                    height: 50
                });
                const thumbPath = `public/thumbnail/file-${filename}.jpg`;
                fs.writeFileSync(thumbPath, thumbnail);
                res.writeHead(200, {
                    'Content-Type': 'image/jpg'
                });
                const readStream = fs.createReadStream(thumbPath);
                readStream.pipe(res);
            });
    }
};
