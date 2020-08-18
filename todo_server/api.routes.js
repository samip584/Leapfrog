const authRoute = require('./controllers/auth.controller')
const userRoute = require('./controllers/user.controller');
const taskRoute = require('./controllers/task.controller');

const authenticate = require('./middlewares/authenticate')

const router = require('express').Router();
router.use('/auth', authRoute)
router.use('/user',authenticate, userRoute);
router.use('/task',authenticate, taskRoute)
module.exports = router;

