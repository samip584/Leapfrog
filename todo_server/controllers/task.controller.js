const router = require('express').Router();
const db = require('../db');

const authorize = require('../middlewares/authorize')

router.put('/:id', authorize, function(req, res, next){
  db.taskDb.updateTask(req.params.id, req.body.task, req.body.state)
  .then((result) => {
    res.json({
      user: result.msg
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.delete('/:id', authorize, function(req, res, next){
  db.taskDb.deleteTask(req.params.id)
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