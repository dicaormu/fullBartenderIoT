package main

import (
	"bartenderAsFunction/dao"
	"bartenderAsFunction/model"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var DataConnectionManager dao.CommandConnectionInterface

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// TODO 1. read all unserved commands, see GetCommands in DataConnectionManager
	commands, err := ???
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 404, Body: err.Error()}, nil
	}
	// TODO 2 iterate over items to get non served commands
	commandsReturn := getNoServedCommands(commands)
	body, _ := json.Marshal(commandsReturn)
	fmt.Println("unserved commands return ", string(body))
	// TODO 3. return unserved commands (status code and body)
	return events.APIGatewayProxyResponse{}, nil
}

// TODO 2. complete function to return no served items
func getNoServedCommands(items []model.Command) ([]model.Command) {
	noServedItems := []model.Command{}
	for _, item := range items {
		if (!item.Beer.Served && item.Beer.Amount > 0) || (!item.Food.Served && item.Food.Amount > 0) {
			//use the method append to append  an item to an array
			//noServedItems = ???
		}
	}
	return noServedItems
}

func main() {
	DataConnectionManager = dao.CreateCommandConnection()
	lambda.Start(Handler)
}
