
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var mongoose = require("mongoose");
var fs = require('fs');
var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('your secret here'));
app.use(express.session({secret: "holy wars"}));  
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var models = require('./models');
models.createSchema(mongoose);

//save question
app.post("/question/add", function(req,res){
var question = req.body.content;

    new Question({
	    question: question,
	}).save(function(err,docs){
	    if(err) res.send("error");
	    res.send(docs);
  
	});
  res.redirect('/question/adde');
});
//Actualizar las preguntas 
app.get("/question/adde", function(req,res){
  var question = req.body.content;
  Question.find({}).sort({_id:"descending"}).skip(0).limit(10).execFind(function(err,docs){
    if(err) res.send(err);
    res.render("question/lista",{questions: docs});
     });
});
//delete question

app.del('/question/:id', function(req,res){
  Question.findById(req.params.id ,function(err,doc){
    if (!doc)return next(new NotFound('Document not found')); 
    doc.remove(function(){
      res.redirect('/');
   });
  });
});
//Insert



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/users', user.list);
app.get("/", function(req,res){
    Question.find({}).sort({_id:"descending"})
            .skip(0).limit(10).execFind(function(err,docs){
        if(err) res.send(err);
        res.render("question/viewquestions",{questions: docs});
    });
    
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
