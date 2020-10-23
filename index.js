var express = require('express')
const bodyParser = require('body-parser')
var app = express()
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
    app.on('mensaje', data => {
		res.sse({
            event: 'mensaje',
            data: data
        });
	});
});

app.post('/message', (req, res, next) => {
    const message = req.body.message;
    res.send({msg: "ok"})
    //guardar msg en la bd
	app.emit('mensaje', {
		title: 'Nuevo Mensaje!',
		message,
		timestamp: new Date()
	});
});


//app.use(sseExpress({handshakeInterval: 5000}));

var server = app.listen(3000, ()=>{
    console.log("servidor corriendo en puerto:",
    server.address().port);
});