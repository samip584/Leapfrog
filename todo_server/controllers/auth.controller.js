const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const config = require('../configs');
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
  return jwt.sign(data, config.jwtSecret)
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
router.post('/register', function(req, res, next){
  let hashedPassword = HashPassword(req.body.password)
  db.userDb.addUser(req.body.name, hashedPassword.hash, hashedPassword.salt)
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