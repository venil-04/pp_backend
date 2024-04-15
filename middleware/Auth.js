const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const PartyPlot = require('../model/PartyPlot');
const dotenv = require('dotenv')
dotenv.config();
// const config = require('config');

// Middleware function to authenticate JWT token
exports.islogin = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // const token = req.cookies.token

  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
    // Add user from payload to request object
    req.user =await User.findById(decoded.userId);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' , err});
  }
};


exports.isOwner = async (req, res, next) => {
    try {

        if (req.user.role!="owner") {
            return res.status(403).json({ msg: 'You are not authorized to update this party plot' });
        }

        next();

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.isadmin = async (req, res, next) => {
  try {

      if (req.user.role!="admin") {
          return res.status(403).json({ msg: 'You are not authorized to update this party plot' });
      }
      next();

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};