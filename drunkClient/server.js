const express = require('express');
const app = express();

// set up the template engine
app.set('views', './views');
app.set('view engine', 'pug');

var indexRouter = require('./routes/index');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
var awsIot = require('aws-iot-device-sdk');
var clientName = "USER2"

function processTest() {
    console.log("creating processing of shadow")
    //
    // The thing module exports the thing class through which we
    // can register and unregister interest in thing shadows, perform
    // update/get/delete operations on them, and receive delta updates
    // when the cloud state differs from the device state.
    //
    const thingShadows = awsIot.thingShadow({
        keyPath: './mything-private.pem.key',
        certPath: "./mything-certificate.pem.crt",
        caPath: "./AmazonRootCA1.pem",
        //TODO change
        clientId: clientName,
        //TODO change
        host: "HOST",
        region: "eu-west-1",
    });
    //
    // Register a thing name and listen for deltas.  Whatever we receive on delta
    // is echoed via thing shadow updates.
    //
    thingShadows.register(clientName, {
        persistentSubscribe: true
    });

    thingShadows
        .on('error', function(error) {
            console.log('error', error);
        });

    thingShadows
        .on('delta', function(thingName, stateObject) {
            console.log('received delta on ' + thingName + ': ' +
                JSON.stringify(stateObject));
            thingShadows.update(thingName, {
                state: {
                    reported: stateObject.state
                }
            });
        });

    thingShadows
        .on('timeout', function(thingName, clientToken) {
            console.warn('timeout: ' + thingName + ', clientToken=' + clientToken);
        });
}

processTest();

app.listen(8080, function() {
    console.log('listening on 8080')
});