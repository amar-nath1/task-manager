
const express=require('express')
const todoControllers=require('../controllers/todoController')
const router=express.Router()

router.post('/add-todo',todoControllers.addToDo)
router.delete('/delete-todo/:id',todoControllers.deleteToDo)
router.put('/done-todo/:id',todoControllers.putToDo)
router.get('/todos',todoControllers.getToDos)

exports.routes= router