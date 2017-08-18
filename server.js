var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/passwordkeeper', function(err){
  if(err){
    console.log("Database connection error: " + err);
  }else{
    console.log("Database connected!");
  }
});

app.post('/users', function(req,res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save();
  res.send('Entered into users');
})

app.listen(app.get('port'), function(){
  console.log("running server on " + app.get('port'));
});
