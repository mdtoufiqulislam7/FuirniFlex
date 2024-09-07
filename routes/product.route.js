const express = require('express')
const router = express.Router()
const authroute  = require('../middleware/auth.middleware')
const { postproduct, getproduct, singleproduct } = require('../controllers/product.crontroller')

router.post('/product',authroute,postproduct)
router.get('/getproduct',authroute,getproduct)
router.get('/getproduct/:id',authroute,singleproduct)
module.exports = router