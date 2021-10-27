'use strict';
const AWS = require('aws-sdk');
var fs = require('fs');

const S3 = new AWS.S3({
    s3ForcePathStyle: process.env.S3_CONFIG_S3FORCEPATHSTYLE,
    accessKeyId: process.env.S3_CONFIG_ACCESSKEYID,
    secretAccessKey: process.env.S3_CONFIG_SECRETACCESSKEY,
    endpoint: new AWS.Endpoint(`${process.env.S3_CONFIG_PROTOCOL}${process.env.S3_CONFIG_ENDPOINT}:${process.env.S3_CONFIG_PORT}`),
});

module.exports.upload = async (fileName, filePath, bucket) => {

    try {

        let bufferData = fs.readFileSync(filePath);

        let params = {
            Bucket: bucket,
            Key: fileName,
            Body: bufferData
        }

        var options = { };

        let result = await S3.upload(params, options).promise();

        return result;

    } catch (error) {

        return { error };

    }
}