# The bartender as a function

## Objectives

The main objective of this Workshop is to learn how to use an IoT platform (aws) for the things fleet industrialization.

It is presented as a simple game: You are the waiter of a bar. Each client is represented by a "thing".
You should wait for the clients' commands and generate the bill.

![the bartender](https://github.com/dicaormu/bartenderAsFunction/blob/solution/bartenderHL.png "The bartender")


Don't worry, I have coded for you the client and the bartender. :relaxed: .

I give you also the structure of the *waiter* project. It includes the *aws-sam* templates and the unit tests of the services (functions) you should code in Nodejs or Go languages.

## Before you start: Requirements

* go > 1.10 
* go dep
* [sam local](https://github.com/awslabs/aws-sam-cli)
* a profile "epf" for aws-cli with your aws credentials

### Creating a profile for aws cli

Go to your security credentials in your aws console, and create an access key. Copy your aws_access_key_id
and your aws_secret_access_key  and  create your ~/.aws/credentials and  ~/.aws/config files as stated in this instructions: https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html
Your profile should be called *epf* (or modify the provided scripts to use the name of the profile you want to use).

## The exercise 

Create your GOPATH environment variable with the path to your go projects.
Inside this path, create a folder src.

```
$ cd $GOPATH/src

$ git clone https://github.com/dicaormu/bartenderAsFunction
```


During this exercise, if you have any question, you can go to the [faq](FAQ.md).

![the exercise](https://docs.google.com/drawings/d/e/2PACX-1vQo9d9tz8Mm0s_NxGLRni0yA6V7r6YDlaJtOHQLblMqXi9jWjkIfv-v8L0eHsnF_XSIbTK2Yg7tecY0/pub?w=480&h=360)

### Step 1
The client is an IOT device who is going to send a command.
As waiter you have to:
* Announce where is the client going to register
* Allow clients to register to the IoT Platform

Don't worry, I've coded the client for you.

1. Go to the folder *registerClient* and modify the file *registerClient.go*. Complete the *TODOs* and make the tests in registerClient_test.go pass.
2. Edit the file *sam.yml* (this is the file containing your project configuration). Verify the configuration for deploying your lambda function for registering a client.
3. In the same file (*sam.yml*) go to the swagger definition of the api and create the definition for *post* on */client*
4. Build and deploy
5. Go to the Aws console, to *Api Gateway* and in *stages* look for the URL of your api to use it.

### Step 2
When the client send a command, as waiter you have to:
* Listen to those messages
* Serve the commands.

Again, don't worry, you have to execute all tests in the files *readCommandXXX_test.go* , once they "pass", you can be sure your function works
There are also *TODOs* comments in the *readCommandXXX.go* file. XXX =  food or beer.

1. Go to the folders *readCommandXXX* and modify the file *readCommandXXX.go*. Complete the *TODOs* and make the tests in readCommandXXX_test.go pass and save the command in the database.
    * Generate and id for the command
    * Save the command to a Dynamodb table
2. Limit the beer commands to max 1 every 2 minutes (we don't want a drunk client), for that, modify the file readCommandBeer.go and add the condition.
3. Go to the *sam.yml* file and create/verify the lambdas *LambdaRuleReadCommandBeer*, *LambdaRuleReadCommandFood* for the files you've just modified.
 (see the *sam.yml* file, *LambdaRuleReadCommandBeer*, *LambdaRuleReadCommandFood* )
4. Associate 2 rules to send the message to be treated by the right lambda. If it is a command with food, send the message to the food lambda, if it is a command wit beer, send it to the beer lambda. (you have to modify the *sam.yml* file, see [the AWS documentation](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sql-reference.html) for more information)
    see [Aws documentation](https://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html) for more information

### Step 3
The client is very drunk. As a waiter you are going to close the bar for him (no more service)
As waiter you should:

* *Know* the status of the client (you should use the shadow for that)
* change the property "barStatus" of the shadow of the client to "CLOSED" (LambdaStatusBar)
* verify that the client does not send more information and clean all commands (pass them to "served", for this point you should see the file sam.yml to get the event from the shadow update and LambdaGetFacture)

1. Go to the folder *changeStatusBar* and modify the file *changeStatusBar.go*. Complete the *TODOs* and make the tests in changeStatusBar_test.go pass.
* This is an Api that are going to allow you to change the shadow of the client to prevent to receive more commands. Modify the file sam.yml to enable the lambda LambdaStatusBar et le endpoint */client/{idClient}/close*
in the swagger section.
2. Go to the folder *getFacture*. This lambda is going to get the bill for the client, when we get the confirmation of the shadow update.
*  Modify the file *getFacture.go*. Complete the *TODOs* and make the tests in getFacture_test.go pass.
    * Read the commands of the client, close them and save the new status in the database.
* Modify the sam.yml file to enable the lambda function *LambdaGetFacture* use as event a rule over the update of the shadow. For more information see [the aws documentation](https://docs.aws.amazon.com/iot/latest/developerguide/using-device-shadows.html)


To know more about aws shadow and how to update the thing, see [the aws documentation](https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html)

Tests are implemented in *FILE_test.go*.

Deploy your solution and enjoy!!!
