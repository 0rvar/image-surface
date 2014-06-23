var express    = require('express')
var bodyParser = require('body-parser')
var app        = express()
var http       = require('http').Server(app)
var io         = require('socket.io')(http)

// Accept POST data
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use('/static', express.static('static'))

// State
var image = null

app.post('/', function(req, res){
  console.log("# New image");
  res.send(null)
  image = req.body.image
  io.emit('image', image)
})

app.post('/clear', function(req, res) {
  console.log("# Cleared image")
  image = null
  io.emit('image', image)
})

app.get('/', function(req, res){
  res.sendfile('index.html')
})

io.on('connection', function(socket){
  if(image != null) {
    socket.emit('image', image)
  }

  console.log('# User connected')
  socket.on('disconnect', function(){
    console.log('# User disconnected')
  })
})

http.listen(3000, function(){
  console.log('Listening on *:3000')
})
