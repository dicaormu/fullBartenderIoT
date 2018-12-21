# THE BARTENDER 

This repositore consists in 2 different project: 
1. The client: Built in Node.js, it consists on the client that is going to send commands to the attendant or server
2. The server: Built in Go, it consists in lambda functions for accepting the comands of the client

## Requirements

1. An AWS user to deploy and explore your work
2. Go > 1.10 
3. [AWS cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
4. A profile "epf" for aws-cli with your aws credentials
5. Node.js and npm

## Getting started

1. Clone this project and checkout the workshop branch:
```
$ git clone https://github.com/dicaormu/fullBartenderIoT
$ git checkout workshop
```

2. If you are NOT interested in the drunk simulator part (device part), you cant continue with step 3.
 * go to the folder drunkClient
```
$ cd fullBartenderIoT/drunkClient
``` 
 * install dependencies 
```
$ npm install
```

3. Go tho the root folder if you have not done yet and copy the folder bartender to your $GOHOME/src path
```
$ cd fullBartenderIoT
$ cp -R bartender $GOHOME/src/
```

4. Now you can follow the instructions for the workshop in the README.md file of each project
