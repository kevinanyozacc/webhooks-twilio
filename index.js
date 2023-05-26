const express = require( 'express' );
const bodyParser = require("body-parser")
const { MessagingResponse } = require('twilio').twiml;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get( '/git', function ( req, res ) {
        res.send("Hello, World!")
    }
);

app.get('/whatsapp-webhookin', function(req, res) {
    let data = req.body;
    let date = new Date();
    console.log('Recibido', date);
    res.send('Received!');
})

app.post('/whatsapp-webhookout', function(req, res) {
    let data = req.body;
    console.log(data);
    res.send('Sended!');
})

app.post('/whatsapp-webhookoutimage', function(req, res) {
    let data = req.body;
    console.log(data);
    res.send('Sended!');
})

app.post('/whatsapp-webhookouttext', (req, res) => {
    const twiml = new MessagingResponse();
  
    twiml.message('The Robots are coming! Head for the hills!');
  
    res.type('text/xml').send(twiml.toString());
  });

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
  
    const message = twiml.message();
    message.body('The Robots are coming! Head for the hills!');
    message.media(
      'https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg'
    );
  
    res.type('text/xml').send(twiml.toString());
  });

const port = 8008;

app.listen( port, function() {
  console.log( `App listening on port ${port}!` )
});