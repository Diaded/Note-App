var express= require('express');
var mongoose= require('mongoose');
var bodyParser= require('body-parser');

mongoose.connect('mongodb://diaded:diaded1@ds259001.mlab.com:59001/notes');
var noteSchema= mongoose.Schema({
  str: String
});

var notes= mongoose.model('notes', noteSchema);


var app= express();
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/api', function(req, res){
  notes.find({}, function(err, data){
    res.json({mess: data});
  });

});

app.post('/add', urlencodedParser, function(req, res){
  console.log(req.body);
  notes({str: 'New Note'}).save(function(){
    res.json({new: 'new'});
  });
});

app.post('/checkNote', urlencodedParser, function(req, res){
  console.log(req.body);
  notes.find({_id: req.body.id}, function(err, data){
    res.json(data[0]);
  });
});


app.post('/changeNote', urlencodedParser, function(req, res){

  console.log(req.body);
  notes.find({_id: req.body.id}, function(err, data){
    console.log(data);
    if(data!==undefined){
    data[0].str=req.body.str;
    notes.update({_id: req.body.id}, data[0], {upsert:true}, function(){
      console.log('finalChange');
    });
  }
  });

  notes.find({}, function(err, data){
    res.json({mess: data});
  });

});



app.listen(3001, function(){
  console.log('working');
});
