
const express=require('express')
const todoControllers=require('../controllers/todoController')
const router=express.Router()

router.post('/add-todo',todoControllers.addToDo)
router.delete('/delete-todo',todoControllers.deleteToDo)
router.put('/done-todo',todoControllers.putToDo)
router.get('/todos',todoControllers.getToDos)

exports.routes= router