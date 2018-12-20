package main

import (
	"bartenderAsFunction/dao"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var IotConnectionManager dao.IotConnectionInterface

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	//TODO 2. Get the "idClient" from the path of the request
	idClient := ""
	if idClient != "" {
		// TODO 3. Change the shadow status for the bar to "CLOSED" (see the method UpdateShadow in the IotConnectionManager)
		//errChangeStatus := ??
		//TODO 4. return 200 if everything went OK
		return events.APIGatewayProxyResponse{}, nil
	}
	return events.APIGatewayProxyResponse{StatusCode: 400}, nil
}

func main() {
	//TODO 1. initialize IotConnectionManager (see iotDao.go)
	//IotConnectionManager = ??
	lambda.Start(Handler)
}
