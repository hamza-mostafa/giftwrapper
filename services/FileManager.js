const fs = require("fs");
const directoryDownload = process.cwd() + '/tmp/downloaded/'
const directoryUpload = process.cwd() + '/tmp/uploading/'


exports.clean = () => {
        fs.rmdir(directoryDownload, { recursive: true }, ()=> console.log('Download folder deleted'))
        fs.rmdir(directoryUpload, { recursive: true }, ()=> console.log('Upload folder deleted'))

}