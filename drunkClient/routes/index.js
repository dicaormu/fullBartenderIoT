var express = require('express');
var router = express.Router();
var awsIot = require('aws-iot-device-sdk');
var Request = require("request");
const fs = require('fs');


//1. TODO change to your prefered
const idThing = "USER2"

/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('index', {title: 'The command is Ready!!:', label1: 'My command:', registered: 'Register to:'});
});

router.post('/registerApi', function (req, res) {
    //2. TODO get the url of the endpoint to register the thing. it arrives in the req.body (ex: req.body.urlSend)
    console.log("body")
    let url = "";
    console.log("registering url " + url);
    //3. TODO create a variable "data" withe the id of the thing, following the definition of the api (ex: {id: idThing} )
    let data = ""
    Request.post({
        "headers": {"content-type": "application/json"},
        "url": url,
        "body": JSON.stringify(data)

    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        //4. TODO parse the body to get the certificate, public key and private key and save them in the respective files
        var parsed = JSON.parse(response.body);
        // 4.1 write in mything-certificate.pem.crt, the certificatePem. Example:
        /*fs.writeFile('mything-certificate.pem.crt', parsed.certificatePem, (err) => {
            if (err) throw err;
            console.log('saved certificate!');
        });*/
        // 4.2 write in mything-public.pem.key, the public key. Example:
        /*fs.writeFile('mything-public.pem.key', parsed.publicKey, (err) => {
            if (err) throw err;
            console.log('saved publicKey!');
        });*/
        // 4.3  write in mything-private.pem.key the privateKey. Example:
        /*fs.writeFile('mything-private.pem.key', parsed.privateKey, (err) => {
            if (err) throw err;
            console.log('saved privateKey!');
        });*/
    });
});


router.post('/addCommand', function (req, res) {
    var data = req.body;
    console.log("data in post router", data);
    const device = awsIot.device({
        //5. TODO change to call the keypath, certpath and caPath. use those you saved in the last step, (ex: ./mything-private.pem.key , ./mything-certificate.pem.crt, ./AmazonRootCA1.pem)
        keyPath: '',
        certPath: "",
        caPath: "",
        clientId: idThing,
        //6. TODO change to the endpoint for the update of the
        host: "HOST"
    });
    //7. send messages to the topic. Build the topic name. See the configuration of the rule to try to guess the topic name. Hint: int contains "topic_drunk"
    let topicName="";
    device.publish(topicName, JSON.stringify(data));
    res.send({msg: ''});
});


module.exports = router;
