var express = require('express')
const bodyParser = require('body-parser')
var app = express()
//npm install --save sse-express@next
let sseExpress = require('sse-express')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/updates', sseExpress(), (req, res) => {
    /*
    res.sse({
        event: 'connected',
        data: {
          welcomeMsg: 'Hello world!'
        }
    });*/
    app.on('message', data => {
		res.sse({
            event: 'message',
            data: data
        });
	});
});

app.post('/message', (req, res, next) => {
    const message = req.body.message;
    res.send({msg: "ok"})
    //guardar msg en la bd
	app.emit('message', {
		title: 'new message!.',
		message,
		timestamp: new Date()
	});
});


//app.use(sseExpress({handshakeInterval: 5000}));

var server = app.listen(3000, ()=>{
    console.log("servidor corriendo en puerto:",
    server.address().port);
});