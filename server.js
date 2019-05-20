const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("underscore");
const PORT = 3000;
//---------- db connection
const db = require("./db");
//------------------------

app.use(bodyParser.json());


//----- GET
app.get("/todos", (req,res)=>{

    db.Todo.findAll({
        where: {}
    }).then((todos)=>{
        res.json(todos);
    })
})



//----- POST
app.post("/todos", (req, res)=>{
    let body = _.pick(req.body, "description","completed");
    db.Todo.create(body).then((todo)=>{
        res.json(todo.toJSON());
    },(err)=>{
        res.status(500).send();
    })
})






//----- PUT
app.put("/todos/:id", (req, res)=>{
    let todoId = req.params.id;

    let body = _.pick(req.body,"description","completed");
    let attributes = {};
    if(body.hasOwnProperty("description")){
        attributes.description = body.description;
    }
    if(body.hasOwnProperty("completed")){
        attributes.completed = body.completed;
    }

    db.Todo.findOne({
        where: {
            id: todoId
        }
    }).then((todo)=>{
        if(todo){
           todo.update(attributes).then((todo)=>{
               res.json(todo.toJSON());
           },()=>{
               res.status(400).send()
           })

        }else{
            res.status(404).send({err: "Not found!"})
        }
    },()=>{
        re.status(500).send()
    })

})



//----- DELETE
app.delete("/todos/:id", (req, res)=>{
    let todoId = req.params.id;

    db.Todo.destroy({
        where :{
            id: todoId
        }
    }).then((rowDeleted)=>{
             if(rowDeleted===0){
                 res.status(404)
             }else{
                 res.status(204).send();
             }
    },()=>{
        res.status(500).send();
    })
});





db.sequelize.sync().then(()=>{
    console.log("Connected to database!");
    app.listen(PORT,()=>{
        console.log("3000 nolu port dinleniyor");
    });
})





