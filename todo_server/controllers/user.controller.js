const router = require('express').Router();
const db = require('../db');

router.route('/')
  .get(function(req, res, next){
    res.json({
      msg:'from empty user'
    })
  })

router.get('/allusers', function(req, res, next){
  db.userDb.getAll()
  .then((msg) => {
    res.json({
      users: msg.users,
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.put('/', function(req, res, next){
  db.userDb.updateUser(req.body.id, req.body.name, req.body.password)
  .then((result) => {
    res.json({
      user: result.msg
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.delete('/', function(req, res, next){
  db.taskDb.deleteTaskOfUser(req.user.id)
  .then((msg) =>{
    console.log(msg)
    db.userDb.deleteUser(req.user.id)
    .then((result) => {
      res.json({
        user: result.msg
      })
    })
    .catch((err) =>{
      next(err)
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.post('/addtask', function(req, res, next){
  db.taskDb.addTask(req.body.task, req.body.state, req.user.id)
  .then((msg) => {
    res.json({
      msg
    })
  })
  .catch((err) =>{
    next(err)
  })
})

router.get('/alltasks', function(req, res, next){
  db.taskDb.getAll(req.user.id)
  .then((result) => {
    res.json({
      tasks: result.tasks,
    })
  })
  .catch((err) =>{
    next(err)
  })
})
  
module.exports = router;