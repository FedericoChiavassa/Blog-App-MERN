const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().getTime().toString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const imgUpload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

  module.exports = imgUpload;