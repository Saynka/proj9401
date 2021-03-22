'use strict';

const express = require('express');

const User = require('../models/users.js');
const basicAuth = require('../auth/middleware/basic-auth-mw.js');
const bearerAuth = require('../auth/middleware/bearer-auth-mw.js');
const acl = require('../auth/middleware/acl-mw.js');

const authRoute = express.Router();

authRoute.post('/sign-up', async (req, res)=>{
  let user = new User(req.body);
  const newUser = await user.save();
  console.log('user: ', user);
  res.status(201).json(newUser);
  
})

authRoute.post('/sign-in', basicAuth, (req,res)=>{
  let userDetails = {
    details: req.user,
    token: req.user.token
  }
  console.log('userDetails: ', userDetails);
  res.status(200).json(userDetails);
  
});

module.exports = authRoute;