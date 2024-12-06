const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dslmk6os4",
  api_key: "823773323126532",
  api_secret: "DH1DlETLdxEKP37_CP5VacLCxLc",
});
// console.log(process.env.CLOUDINARY_CLOUD_NAME)
module.exports = cloudinary;
