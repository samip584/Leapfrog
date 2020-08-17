const path = require('path');
const express = require('express');
const mysql = require('mysql');

const app = express();

const config = require('./configs');

// load route
const apiRoute = require('./api.routes')

const db = require('./db')

//parse incomming data
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())

app.use('/api', apiRoute)

app.use(function(req, res, next){
  next(({
    msg: 'Not Found',
    status: 404,
  }))
})

app.use(function(err, req, res, next){
  res.status(err.status || 400).json({
    msg: err.msg || err,
    status: err.status || 400,
  })
})

app.listen(8000, function(){
  console.log('\nserver listening at port ' + config.port)
  console.log('press CTRL +C to exit\n')
})