var cokieSession = require('cookie-session');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended:false})

var app = express();

app.use(cokieSession({
   secret:'todotopsecret'
}));

//create empty todo in form of array
app.use( function(req,res,next){
    if(typeof(req.session.todoList) == 'undefined' ){
        req.session.todoList = [];
    }
    next();
})

//ROUTE MGT
app.get('/todo',function(req,res){
   res.render('todo-list.ejs',{todoList:req.session.todoList});
});
app.post('/todo/add',urlencodedparser,function(req,res){
    if(req.body.todo != ''){
        req.session.todoList.push(req.body.todo);
    }
    res.redirect('/todo');
    //take the submitted value in variable

});
app.get('/todo/delete/:id',function(req,res){
    if(req.params.id != ''){
        req.session.todoList.splice(req.params.id,1);
    }
    res.redirect('/todo');
});

/*
@todo view /todo todo/1
 */

//this is a general snippet that redirects all page not found to TODo
app.use(function(req,res,next){
    res.redirect('/todo');
})

app.listen(3000);