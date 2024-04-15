const express = require('express');
const { islogin, isOwner, isadmin } = require('../middleware/Auth');
const { createpp, updatepp ,getallpp, deletepp, getsinglepp, addReview } = require('../controller/PartyPlotController');
const router = express.Router();


router.post('/create',createpp)
router.post('/update/:id',updatepp)
router.get('/getall',islogin,getallpp);
router.delete('/delete/:id',deletepp)
router.get('/get/:id',getsinglepp)
router.post('/addreview/:id',islogin,addReview)

module.exports= router