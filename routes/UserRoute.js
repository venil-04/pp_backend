// routes/user.js
const express = require('express');
const router = express.Router();
const {createUser, loginuser} = require('../controller/UserController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the directory where uploaded files will be stored

// Register a new user
router.post('/register', upload.single('profilePic'), createUser);
router.post('/login',loginuser);


module.exports = router;
