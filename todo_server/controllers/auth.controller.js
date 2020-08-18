const express = require('express');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const db = require('../db');

function genRandomString(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') 
          .slice(0,length);  
};


function sha512(password, salt){
  let hash = crypto.createHmac('sha512', salt); 
  hash.update(password);
  let value = hash.digest('hex');
  return {
      salt:salt,
      passwordHash:value
  };
};

function HashPassword(userpassword) {
  let salt = genRandomString(16); 
  let passwordData = sha512(userpassword, salt);
  return{
    hash: passwordData.passwordHash,
    salt: passwordData.salt,
  }
}

function createToken(data){
  return jwt.sign(data, process.env.JWTSECRET)
}

router.post('/login', function(req, res, next){
  //validate()
  db.userDb.getUserByName(req.body.name)
  .then((result) => {
    let user = JSON.parse(JSON.stringify(result)).user[0];
    console.log(sha512(req.body.password, user.salt).passwordHash)
    if(user.password === sha512(req.body.password, user.salt).passwordHash){
      let data = {
        id: user.id,
      }
      let token = createToken(data);
      res.json({
        token
      })
    }else{
      next({
        err: 'Password incorrect'
      })
    }
  })
  .catch((err) => {
    next(err)
  })
})

router.post('/register',[
    body('email').isEmail(),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('Password must contain one lowercase character, one uppercase character, one number and one special character')
  ], function(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ err: errors.array() });
  }
  let hashedPassword = HashPassword(req.body.password)
  db.userDb.addUser(req.body.name, hashedPassword.hash, hashedPassword.salt, req.body.email)
  .then((msg) => {
    res.json({
      msg
    })
  })
  .catch((err) =>{
    next(err)
  })
})

module.exports = router;