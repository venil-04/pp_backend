const express = require('express')
const { createbooking } = require('../controller/BookingController')
const router = express.Router()


router.post('/create',createbooking)


module.exports=router