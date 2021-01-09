var bodyParser =  require('body-parser');
const { request } = require('express');
var mongoose = require('mongoose');
var url = "mongodb+srv://user-todo:test@todo.hqxqk.mongodb.net/tododb?retryWrites=true&w=majority";

var connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

// Connect to database
mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
// Creating a schema

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item: 'Groceries'}, {item: 'Yoga'}, {item: 'Homework'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        // get data from database and pass it to view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
        
    });
    app.post('/todo',urlencodedParser, function(req, res){
        // get data from app view and pass it to database
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item', function(req, res){
        //delete the crossed item form database
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

};