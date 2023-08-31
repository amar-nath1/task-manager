
const Todo=require('../models/todomodel')

exports.addToDo=(req,res,next)=>{
    Todo.create({
        todoname:req.body.todoname,
        tododesc:req.body.tododesc,
        done:false
    }).then(()=>{
        res.status(200).json({'added':true})
    })
}

exports.deleteToDo=(req,res,next)=>{
    Todo.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.status(200).json({'deleted':true})
    })
}

exports.putToDo=(req,res,next)=>{
    Todo.update({
        done:false
      },{
        where:{
          id:id
        }
      })
    
}

exports.getToDos=(req,res,next)=>{
    Todo.findAll().then((allTodos)=>{
            res.status(200).json({'list':allTodos})
    })
}