const express = require('express')
const { registation, login } = require('../controllers/auth.crontroller')
const router = express.Router()


router.post('/login',login)
router.post('/register',registation)

module.exports = router



