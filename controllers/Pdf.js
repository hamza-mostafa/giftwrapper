const { GeneratePdf } = require('../services/ImageProcessor')
const {image} = require('../config/image')
const S3service = require('../services/S3')
const {addDatePdfExtension} = require("../helpers/others");
exports.handlePattern =  async(req, res) => {
    console.log('starting process', new Date)
    return S3service.uploadFile(
        await GeneratePdf(req.files.pattern.tempFilePath),
        addDatePdfExtension(image.name ? image.name : req.files.pattern.name),
        res
        )
}

exports.fetchPdfs =  (req, res) => {
    return S3service.fetchPdfs(res)
}