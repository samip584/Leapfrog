const fs = require('fs');

function write(name, content) {
  return new Promise(function(resolve, reject){
    fs.writeFile('./files/' + name, content.replace(/%20/g, ' '), function (err, done){
      if (err){
        reject(err);
      }else{
        resolve(done);
      }
    })
  })
}

function read(name) {
  return new Promise(function(resolve, reject){
    fs.readFile('./files/' + name, function (err, data){
      if (err){
        reject(err);
      }else{
        resolve(data);
      }
    })
  })
}

function rename(file, newName) {
  return new Promise(function(resolve, reject){
    fs.rename('./files/' + file, './files/' + newName, function (err, done){
      if (err){
        reject(err);
      }else{
        resolve(done);
      }
    })
  })
}

function del(name) {
  return new Promise(function(resolve, reject){
    fs.unlink('./files/' + name, function (err, done){
      if (err){
        reject(err);
      }else{
        resolve(done);
      }
    })
  })
}

module.exports = {
  write,
  read,
  rename,
  del,
}