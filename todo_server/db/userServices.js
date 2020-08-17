class userServices{
  constructor(db){
    this.db = db;
  }

  getAll(){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query('SELECT * FROM users', function(err, results){
         if(err){
          rej(err);
         }else{
          res({
            users: results,
          });
         }
       })
    })
  }
  
  addUser(name, password, salt){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query(`INSERT INTO users (name, password, salt) VALUES ('${name}', '${password}', '${salt}')`, function(err, results){
        if(err){
          rej(err);
        }else{
          res({ 
            msg: "User was addded"
          });
        }
      })
   })
  }
  
  getUserByName(name){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query(`SELECT * FROM users WHERE name = '${name}'`, function(err, result){
        if(err){
          rej(err);
        }else{
          res({
            user: result
          })
        }
      })
   })
  }
  
  getUserById(id){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query(`SELECT * FROM users WHERE id = ${id}`, function(err, result){
        if(err){
          rej(err);
        }else{
          res({
            user: result
          })
        }
      })
   })
  }
  
  updateUser(id, name, password){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query(`UPDATE users SET name = '${name}', password = '${password}' WHERE id = ${id}`, function(err, result){
        if(err){
          rej(err);
        }else{
          res({
            msg : name + ' was updated'
          })
        }
      })
   })
  }
  
  deleteUser(id){
    let db = this.db;
    console.log('ok')
    return new Promise(function(res, rej){
      db.query(`DELETE FROM users WHERE id = ${id}`, function(err, result){
        if(err){
          rej(err);
        }else{
          res({
            msg : 'Account  deleted'
          })
        }
      })
   })
  }
}

module.exports = {
  userServices
}