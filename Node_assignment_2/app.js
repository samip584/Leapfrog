const express = require('express');

const app = express();

const config = require('./configs');
const fileOperation = require('./file');

app.get('/write/:fileName', function(req, res){
  fileOperation.write(req.params.fileName+'.txt', req.query.text)
      .then(function(data){
        res.json({
          message: 'success'
        });
      })
      .catch(function(err){
        res.json({
          message: 'failure >> '+ err
        });
      })
  
})

app.get('/read/:fileName', function(req, res){
  fileOperation.read(req.params.fileName+'.txt')
      .then(function(data){
        console.log(data)
        res.json({
          file_text: data.toString('utf-8')
        });
      })
      .catch(function(err){
        res.json({
          message: 'failure >> '+ err
        });
      })
})

app.get('/rename/:fileName', function(req, res){
  fileOperation.rename(req.params.fileName+'.txt', req.query.newName+'.txt')
      .then(function(data){
        res.json({
          message: req.params.fileName+'.txt was named '+req.query.newName+'.txt'
        });
      })
      .catch(function(err){
        res.json({
          message: 'failure >> '+ err
        });
      })
})

app.get('/delete/:fileName', function(req, res){
  fileOperation.del(req.params.fileName+'.txt')
      .then(function(data){
        res.json({
          message: req.params.fileName+'.txt was deleted'
        });
      })
      .catch(function(err){
        res.json({
          message: 'failure >> '+ err
        });
      })
  
})

app.listen(8000, function(){
  console.log('\nserver listening at port ' + config.port)
  console.log('press CTRL +C to exit\n')
})