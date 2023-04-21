const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const productController = require('./controller');

router.post('/product', multer({dest: os.tmpdir()}).single('image'), productController.store);
router.get('/product', productController.index)
router.put('/product/:id',multer({dest: os.tmpdir()}).single('image'), productController.update)
router.delete('/product/:id',productController.destroy)
module.exports = router;