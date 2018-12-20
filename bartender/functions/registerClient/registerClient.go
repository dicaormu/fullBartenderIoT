package main

import (
	"bartenderAsFunction/dao"
	"bartenderAsFunction/model"
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/satori/go.uuid"
)

var IotConnectionManager dao.IotConnectionInterface

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	//2. TODO get the body of the request and cast it to []byte
	// body := ???
	drunkClient := model.DrunkClient{}

	//3. TODO unmarshal the body into drunkClient (see the structure in model)
	err := json.Unmarshal([]byte(???), &drunkClient)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 400}, err
	}
	//assign an Id to the device when it does not have
	if drunkClient.IdClient == "" {
		uid, _ := uuid.NewV4()
		drunkClient.IdClient = uid.String()
	}
	//4. TODO Register the Device, see the file iotDao.go for more information about how to do it
	//IotConnectionManager.???
	b, _ := json.Marshal(drunkClient)
	return events.APIGatewayProxyResponse{StatusCode: 200, Body: string(b)}, nil
}

func main() {
	// 1. TODO create an instance of a dao.IotConnectionInterface (see the file iotDao.go, method CreateIotConnection)
	// and initialize the IotConnectionManager
	// IotConnectionManager = ???
	lambda.Start(Handler)
}
