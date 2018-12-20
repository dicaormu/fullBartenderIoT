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
//1. TODO change to your prefered
var clientName = "USER2"

function processTest() {
    console.log("creating shadow processing")
    //
    // The thing module exports the thing class through which we
    // can register and unregister interest in thing shadows, perform
    // update/get/delete operations on them, and receive delta updates
    // when the cloud state differs from the device state.
    //2. TODO Create the thing shadow using the certificates saved in the step 1
    const thingShadows = awsIot.thingShadow({
        keyPath: '',
        certPath: "",
        caPath: "",
        clientId: clientName,
        //3. TODO change to the endpoint of the IoT  system (in the AWS console: manage/things/your device/interact )
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

    thingShadows.on('error', function(error) {
            console.log('error', error);
        });

    //4. TODO implement the function handling the delta of the shadow. Remember: delta means there was a changement: change the reported state to the same desired for the object
    // see https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-document.html
    thingShadows.on('delta', function(thingName, stateObject) {
            console.log('received delta on ' + thingName + ': ' + JSON.stringify(stateObject));
            // 4.1 use the method update of the thingShadows to set the state.reported value to the same of the stateObject ( ex: reported : stateObject.state)
            //see https://github.com/aws/aws-iot-device-sdk-js#thingShadow. Example:
            //thingShadows.update(thingName, stateValueReported);

        });

    thingShadows.on('timeout', function(thingName, clientToken) {
            console.warn('timeout: ' + thingName + ', clientToken=' + clientToken);
        });
}

// 5. TODO call the processTest method to synchronize the shadow of your object
//processTest();

app.listen(8080, function() {
    console.log('listening on 8080')
});