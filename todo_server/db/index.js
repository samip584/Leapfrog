const mysql = require('mysql');
const { port } = require('../configs');

const userService = require('./userServices')
const taskService = require('./taskServices')

let db = mysql.createConnection({ 
  password:'dbPassword',
  user:'dbUser',
  host: 'localhost',
  database: 'usersDB',
  port:3306
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

