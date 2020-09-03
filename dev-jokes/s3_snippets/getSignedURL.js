'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'region', // replace with region e.g. 'us-east-1'
  accessKeyId: "XXXXXXXXXXXXXXXXXXXX", // replace with your accessKeyID
  secretAccessKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // replace with your secretAccessKey
});
const s3 = new AWS.S3({signatureVersion: 'v4'});

exports.handler = (event, context, callback) => {
  const bucket = process.env['s3_bucket'] || "devjokes"; // replace this with your S3 bucket
  if (!bucket) {
    callback(new Error(`S3 bucket not set`));
  }
  
  const key = event['fileName'];
  const type = event['fileType'];
  if (!key) {
    callback(new Error('S3 object key missing'));
    return;
  }

  const params = {
    Bucket: bucket,
    Key: key,
    Expires: 500,
    ContentType: type,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', params, (error, data) => {
    if (error) {
      callback(error);
    } else {
      const returnData = {
        signedRequest: data,
        url: `https://${bucket}.s3.amazonaws.com/${key}`
      };
      callback(null, returnData);
    }
  });
};