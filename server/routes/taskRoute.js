const router= require('express').Router()
const {usertask, alltask, addtask} = require('../controllers/taskController')

router.post('/addtask',addtask)

router.get('/usertask',usertask)

router.get('/alltask',alltask)

module.exports=router