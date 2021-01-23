require('dotenv').config();
const AWS = require('aws-sdk')
const fs = require("fs");
const FileManager = require("./FileManager");

AWS.config.apiVersions = {
    s3: process.env['s3_version'],
    accessKeyId: process.env['AWS_ACCESS_KEY'],
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
};

const s3 = new AWS.S3();

exports.uploadFile = (PDFStream, Key, res) => {
        const params = {
            Bucket: process.env['AWS_S3_BUCKET'],
            ACL:'public-read',
            Key,
            Body: PDFStream
        };
    console.log('finshed buffering', new Date)
    console.log('starting upload', new Date)

    s3.upload(params, function(err, data) {
        console.error(err)
        console.log('finshed upload', new Date)
        FileManager.clean() // once file is uploaded, the tmp files are not needed.
        res.status(200).json(data);
    });
};

exports.fetchPdfs = (res) => {
    if(!process.env['AWS_S3_BUCKET']){
        throw new Error('You must specify a bucket name in the .env file')
    }

    let params = {
        Bucket: process.env['AWS_S3_BUCKET']
    };

    return s3.listObjects(params, function(err, data) {
        console.error(err)
        res.status(200).json(data);
    });
}