const router = require('express').Router();
const db = require('../db');

router.route('/')
  .get(function(req, res, next){
    res.json({
      msg:'from empty user'
    })
  })

router.put('/update', function(req, res, next){
  db.taskDb.updateTask(req.query.id, req.body.task, req.body.state)
  .then((result) => {
    res.json({
      user: result.msg
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.delete('/delete', function(req, res, next){
  db.taskDb.deleteTask(req.query.id)
  .then((result) => {
    res.json({
      user: result.msg
    })
  })
  .catch((err) =>{
    next(err)
  })
})


  
module.exports = router;