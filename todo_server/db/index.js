const mysql = require('mysql');

const userService = require('./userServices')
const taskService = require('./taskServices')

let db = mysql.createConnection({ 
  password: process.env.dbPassword,
  user: process.env.dbUser,
  host: process.env.host,
  database: process.env.DB,
  port: process.env.dbPort
});

db.connect(function(err){
  if(err){
    console.log(({
      msg: err || 'Database Connection Failed',
      status: 404,
    }))
  }else{
    console.log('Database connected')
  }
})
let userDb = new userService.userServices(db);
let taskDb = new taskService.taskServices(db);

module.exports = {
  userDb,
  taskDb,
}

