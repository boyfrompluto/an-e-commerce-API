const multer = require("multer");
const path= require("path")

const userStorage = multer.diskStorage({
    destination: 'photoUploads',
    filename: (req, file, cb) => {
      cb(null, Date.now()+path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: userStorage
  }).single("image");

const productStorage = multer.diskStorage({
    destination: 'productUploads',
    filename: (req, file, cb) => {
      cb(null, Date.now()+path.extname(file.originalname));
    }
  });
  const uploads = multer({
    storage: productStorage
  }).array("images",3);

  module.exports= upload;
  module.exports= uploads;