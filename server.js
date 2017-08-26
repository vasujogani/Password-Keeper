var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var appRoutes = require("./app/routes/api")(router);

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); // Allow front end to access public folder
app.use('/api', appRoutes); 

mongoose.connect('mongodb://localhost:27017/passwordkeeper', function(err){
  if(err){
    console.log("Database connection error: " + err);
  }else{
    console.log("Database connected!");
  }
});

app.get("*", function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})

app.listen(app.get('port'), function(){
  console.log("running server on " + app.get('port'));
});
