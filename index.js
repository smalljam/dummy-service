var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send( fs.readFileSync('users.json', 'utf-8') );
});

app.post('/', function(req, res) {
  var allUsers = getUsers();
  var lastId = allUsers[allUsers.length-1].id;

  var newUser = {
    id: lastId+1,
    name: req.body.name,
    info: req.body.info,
    second: req.body.second,
    avatar: req.body.avatar,
    newfield: req.body.newfield
  };

  allUsers.push(newUser);

  saveUsers(allUsers);

  res.sendStatus(200);
});

app.put('/:id', function(req, res) {
  var allUsers = getUsers();

  var user = null;
  allUsers.forEach(function(u){
    if( u.id == req.params.id ){
      user = u;
    }
  });

  if( user ) {
    user.name = req.body.name;
    user.info = req.body.info;
    user.second = req.body.second;
    user.avatar = req.body.avatar;
    user.newfield = req.body.newfield;
    saveUsers(allUsers);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }



});


function getUsers(){
  return JSON.parse( getUsersJSON() );
}

function getUsersJSON(){
  return fs.readFileSync('./users.json', 'utf-8')
}

function saveUsers(users) {
  return fs.writeFileSync('users.json', JSON.stringify(users),'utf-8');
}

app.listen(8383, function() {
  console.log('Example app listening on port 8182!');
});
