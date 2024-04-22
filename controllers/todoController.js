
const Todo=require('../models/todomodel')

exports.addToDo=(req,res,next)=>{
    console.log(req.body,' reqbody')
    Todo.create({
        todoname:req.body.todoname,
        tododesc:req.body.tododesc,
        done:false,
        status: req.body.status
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
    console.log(req.body,' thusisbody')
    Todo.update({
        status: req.body.status,
        done:req.body.status.toLowerCase().includes('done')?true:false
      },{
        where:{
          id:req.params.id
        }
      }).then(()=>{
        res.status(200).json({'added':true})
    })
    
}

exports.getToDos=(req,res,next)=>{
  
    Todo.findAll().then((allTodos)=>{
            res.status(200).json({'list':allTodos})
    })
}