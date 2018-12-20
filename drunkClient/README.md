# Drunk simulator

To run use the command 
```
$ node server.js
```

Use this project as a complement for the bartender-cloud project. This is the client or drunk that is going to ask for commands to the server.

### Step 0

Go to https://docs.aws.amazon.com/iot/latest/developerguide/managing-device-certs.html#server-authentication and 
download the ca certificates and save them in the root of this project

### Step 1

Complete the methods to register the device to aws. Verify if everything is Ok in the Aws console
  - Update the file index.js. Change the variable *idThing* to set a name you like
  - Update the function for the endpoint /registerApi, to complete the request to the entered endpoint and write the information of the returned certificates in the files :
    - mything-certificate.pem.crt 
    - mything-private.pem.key
    - mything-public.pem.key
  - To know the name of the variables for the request response, ask for the api definition of the returning objects
  - Look in ApiGateway for the endpoint of the registration api, and use it
  - Verify in the aws console that the thing with the name you provided in the *idThing* variable exists, and that it has associated a certificate and a policy

### Step 2

Complete the information of the downloaded keys and call the *addCommand* method to send commands.

 - Go to the file index.js
 - Look for the implementation of the endpoint *addCommand* (post)
 - Change the value of for *keyPath*, *certPath*, *caPath*. set the name of the file you have used in the step 2 to save the certificates.
 - Change the value of for *host*. Look for it in the Aws IoT console, in *thing*-*Interact*.
 - Publish the message to the topic topics/+/topic_drunk (see the [sdk documentation](https://github.com/aws/aws-iot-device-sdk-js)
 - Send beer and food commands

### Step 3

Complete the information of the downloaded keys and call the *processTest* method to listen the
delta in the IoT shadow 
  - Go to the file server.js 
  - Modify the variable *clientName* and set the name you used for *idThing* in step2
  - Modify the method *processTest*. Change the value of for *keyPath*, *certPath*, *caPath*. set the name of the file you have used in the step 2 to save the certificates.
  - Modify the method *processTest*. Change the value of for *host*. Look for it in the Aws IoT console, in *thing*-*Interact*.
  - Verify the *region*
  - Call the method *processTest* in the code. Restart the application. (For more information see the [sdk documentation](https://github.com/aws/aws-iot-device-sdk-js)

  