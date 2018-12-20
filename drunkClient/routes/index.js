var express = require('express');
var router = express.Router();
var awsIot = require('aws-iot-device-sdk');
var Request = require("request");
const fs = require('fs');

const idThing = "USER2"

/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('index', {title: 'The command is Ready!!:', label1: 'My command:', registered: 'Register to:'});
});


router.post('/addCommand', function (req, res) {
    var data = req.body
    console.log("data in post router", data)
    const device = awsIot.device({
        keyPath: './mything-private.pem.key',
        certPath: "./mything-certificate.pem.crt",
        caPath: "./AmazonRootCA1.pem",
        //TODO change
        clientId: idThing,
        //TODO change
        host: "HOST"
    });
    let topicName="topics/"+idThing+"/topic_drunk"
    device.publish(topicName, JSON.stringify(data));
    res.send({msg: ''});
});


router.post('/registerApi', function (req, res) {
    //TODO change
    console.log("body")
    //console.log(req)
    let url = req.body.urlSend;
    console.log("registering url " + url);

    let data = {id: idThing};
    console.log("stingifyed: ", JSON.stringify(data));
    Request.post({
        "headers": {"content-type": "application/json"},
        "url": url,
        "body": JSON.stringify(data)

    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        var parsed = JSON.parse(response.body)
        fs.writeFile('mything-certificate.pem.crt', parsed.certificatePem, (err) => {
            if (err) throw err;
            console.log('saved certificate!');
        });
        fs.writeFile('mything-public.pem.key', parsed.publicKey, (err) => {
            if (err) throw err;
            console.log('saved publicKey!');
        });
        fs.writeFile('mything-private.pem.key', parsed.privateKey, (err) => {
            if (err) throw err;
            console.log('saved privateKey!');
        });
    });
});

module.exports = router;
