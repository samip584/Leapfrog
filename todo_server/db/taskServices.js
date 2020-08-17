const maindb = require("./index");

class taskServices{
  constructor(db){
    var self = this;
    this.db = db;
  }

  getAll(id){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query(`SELECT * FROM tasks WHERE user_id = ${id}`, function(err, results){
         if(err){
          rej(err);
         }else{
          res({
            tasks: results,
          });
         }
       })
    })
  }
  
  addTask(task, state, userId){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query(`INSERT INTO tasks (task, state, user_id) VALUES ('${task}', '${state}', ${userId})`, function(err, results){
        if(err){
          rej(err);
        }else{
          res({ 
            msg: "Task was addded",
            results
          });
        }
      })
   })
  }

  //authorize
  getTaskById(id){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query(`SELECT * FROM tasks WHERE id = ${id}`, function(err, result){
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
      db.query(`SELECT user_id FROM tasks WHERE id = ${id}`, function(err, result){
        if(err){
          rej(err);
        }else{
          res({
            userId: result
          })
        }
      })
   })
  }
  
  updateTask(id, task, state){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query(`UPDATE tasks SET task = '${task}', state = '${state}' WHERE id = ${id}`, function(err, result){
        if(err){
          rej(err);
        }else{
          res({
            msg : 'Task updated',
            result
          })
        }
      })
   })
  }
  deleteTaskOfUser(id){
    let db = this.db;
    let self = this;
    return new Promise(function(res, rej){
      db.query(`SELECT * FROM tasks WHERE user_id = ${id}`, function(err, result){
        if(err){
          rej(err);
        }else{
          let tasks = JSON.parse(JSON.stringify(result))
          console.log(tasks)
          tasks.forEach(task => {
            self.deleteTask(task.id)
          });
          res({
            msg: 'all task deletedeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTU5NzU3MTE1N30.BOik3q79YltwJx4DWDibbTvbjgcC2TjLzAZ1o7YW5jw'
          })
        }
      })
   })
  } 

  deleteTask(id){
    let db = this.db;
    return new Promise(function(res, rej){
      db.query(`DELETE FROM tasks WHERE id = ${id}`, function(err, result){
        if(err){
          rej(err);
        }else{
          console.log('ok')
          res({
            msg : 'Task  deleted'
          })
        }
      })
   })
  }
}

module.exports = {
  taskServices
}