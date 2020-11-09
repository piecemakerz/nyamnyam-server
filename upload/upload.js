const multer = require('multer');
const multerS3 = require('multer-s3')
const path = require('path');
const AWS = require("aws-sdk");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const s3 = new AWS.S3({ 
    accessKeyId: process.env.KEYID, 
    secretAccessKey: process.env.KEY, 
    region: process.env.REGION, 
});

const storage = multerS3({ 
    s3: s3,
    bucket: 'nyam-nyam',
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    acl: 'public-read-write',
    key: function (req, file, cb) { 
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension)
    },
})

exports.upload = multer({ storage: storage });