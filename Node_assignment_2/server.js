const http = require('http');

const fileOperation = require('./file');

const server = http.createServer(function(req, res){
  let urlComponents =  req.url.split('/');
  switch(urlComponents[1]){
    case '':
      res.end('Welcome');
    case 'write':
      fileOperation.write(urlComponents[2]+'.txt', urlComponents[3])
      .then(function(data){
        res.end('success');
      })
      .catch(function(err){
        res.end('failure >>', err);
      })
      break
    case 'read':
      fileOperation.read(urlComponents[2]+'.txt')
      .then(function(data){
        console.log()
        res.end(data);
      })
      .catch(function(err){
        res.end('failure >>', err);
      })
      break
    case 'rename':
      fileOperation.rename(urlComponents[2]+'.txt',urlComponents[3]+'.txt')
      .then(function(data){
        res.end(urlComponents[2]+'.txt was named '+ urlComponents[3]+'.txt');
      })
      .catch(function(err){
        res.end('failure >>', err);
      })
      break
    case 'delete':
      fileOperation.del(urlComponents[2]+'.txt')
      .then(function(data){
        res.end(urlComponents[2]+'.txt was deleted');
      })
      .catch(function(err){
        res.end('failure >>', err);
      })
      break
  }
})

server.listen(8000, function() {
  console.log('server is up and running at port 8000')
  console.log('press CTRL +C to exit')
})

