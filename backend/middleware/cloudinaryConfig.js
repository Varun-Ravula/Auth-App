// importing the modules
const cloudinary=require('cloudinary').v2;
// named import
const {CloudinaryStorage}=require('multer-storage-cloudinary');
const multer=require('multer');

// importing cloundinary env variables from .env file
const cloud_name_env=process.env.CLOUD_NAME;
const api_key_env=process.env.API_KEY;
const api_secret_env=process.env.API_SECRET;

// first we should configure the cloudinary with our credentials
cloudinary.config({
    cloud_name:cloud_name_env,
    api_key:api_key_env,
    api_secret:api_secret_env
})

// then we should decide where it should be stored and what folder and mislaneous items should be mentioned
const ClStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'users-profile',
        public_id:(request,file)=>file.fieldname+'-'+Date.now(),
        allowed_formats:['jpg','jpeg','png'],
    }
})

// we should configure the multer
const multerObject=multer({storage:ClStorage});

// exporting the multer object because we can use the multer object where ever and upload photos
module.exports=multerObject;