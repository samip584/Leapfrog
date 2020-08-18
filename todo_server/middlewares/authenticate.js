const jwt = require('jsonwebtoken')


module.exports=function(req, res, next){
  let token;
  if (req.headers['authorization'])
    token = req.headers['authorization']
  if (req.headers['x-access-token'])
    token = req.headers['authorization']
  if (req.headers['token'])
    token = req.headers['token']
  if(!token){
    return next({
      msg: 'Token not provided',
      status: 400 
    })
  }
  jwt.verify(token, process.env.JWTSECRET, function(err, decoded){
    if(err){
      return next(err)
    }
    req.user = decoded;
    next();
  })
}