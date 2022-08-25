const router = require("express").Router();
const verifyToken = require("../controller/verifyToken")
const {reset,deleteUser, viewUserDetails,editUserDetails,changeUserPassword,viewAllUsers} =require("../controller/user.controller")
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


router.get("/test1", (req, res) => {
  res.send("hello");
});
router.post("/reset",reset);
router.post("/view/:token",verifyToken,viewUserDetails);
router.post("/edit/:token",upload,verifyToken,editUserDetails);
router.get("/viewUsers/:token",verifyToken,viewAllUsers)
router.post("/changePassword/:token",verifyToken,changeUserPassword);
router.delete("/deleteUser/:token/:id",verifyToken,deleteUser);
module.exports = router;
