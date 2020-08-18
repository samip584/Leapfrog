const e = require("express");
const db = require('../db');

module.exports = function(req, res, next){
  db.taskDb.getUserById(req.params.id)
  .then((result) => {
    userId = JSON.parse(JSON.stringify(result)).userId[0].user_id;
    if (req.user.id === userId){
      return next();
    } else{
      return next({
        msg: 'you dont have access',
        status: 401
      })
    }
  })
 
}