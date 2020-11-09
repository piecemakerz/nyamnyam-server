// prettier-ignore
const express = require('express');
const router = express.Router();
const { upload } = require('../upload/upload');
// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage })

const manageMenuController = require('../controller/manageMenu');

router.get('/mymenu/:storeId', manageMenuController.myMenu.get);
router.post(
  '/editmenu',
  upload.single('data'),
  manageMenuController.editMenu.post
);
router.get('/editmenu/', manageMenuController.editMenu.get);
router.post(
  '/addmenu',
  upload.single('data'),
  manageMenuController.addMenu.post
);
router.post('/deletemenu', manageMenuController.deleteMenu.post);
//이 아이를 결국 이동해야 할 것 같음.
//router.get('/detail/:id', manageMenuController.detail.get);

module.exports = router;
