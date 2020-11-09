const express = require("express");
const router = express.Router();
const { upload } = require('../upload/upload')

const editInfoController = require("../controller/editInfo");

router.post("/name", editInfoController.name.post);
router.post("/password", editInfoController.password.post);
router.post("/image", upload.single('img'), editInfoController.image.post);
router.post("/quit", editInfoController.quit.post);

module.exports = router;


// const { upload } = require('./upload);

// app.post('/uploadOne', upload.single('img'), (req,res) => {
// 	//파일 하나만 업로드 할 때. ex) { img: File }
// 	console.log(req.file)
// }
