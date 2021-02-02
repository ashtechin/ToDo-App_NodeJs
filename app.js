var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// Setting up template engines
app.set('view engine', 'ejs');

//Static files handling
app.use(express.static(__dirname + '/public'));

//run controllers
todoController(app);

 // listen to port
 var port = 3000 || process.env.PORT;
 app.listen(port);
