const express = require('express');
const multer = require('multer');
const webApiRouter = express.Router();
const ProductSection = require('../controllers/productSection');
const MainSection = require('../controllers/mainSection');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'productImages/'); // Set the destination folder
  },
  filename: (req, file, cb) => {
    const trimmedFilename = file.originalname.replace(/\s+/g, '');
    cb(null, trimmedFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 megabytes
  },
});

// admin user section
webApiRouter.get('/test', MainSection.test);
webApiRouter.post('/createAdmin', MainSection.createAdmin);
webApiRouter.post('/adminLogin', MainSection.adminLogin);

// product section
webApiRouter.post('/addProduct', upload.array('images', 5), ProductSection.addProduct); // Specify 'images' as the field name and allow up to 5 files
webApiRouter.get('/getAllProducts', ProductSection.getAllProducts);
webApiRouter.post('/deleteProductById', ProductSection.deleteProductById);
webApiRouter.post('/updateProductById', upload.array('images', 5), ProductSection.updateProductById); // Specify 'images' as the field name and allow up to 5 files
webApiRouter.post('/getProductById', ProductSection.getProductById); // Specify 'images' as the field name and allow up to 5 files
webApiRouter.post('/getProductsByCategory', ProductSection.getProductsByCategory);



module.exports = webApiRouter;
