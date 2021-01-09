var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// Setting up template engines
app.set('view engine', 'ejs');

//Static files handling
app.use(express.static('./public'));

//run controllers
todoController(app);

 // listen to port
 app.listen(3000);
