package main

import (
	"bartenderAsFunction/dao"
	"bartenderAsFunction/model"
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/satori/go.uuid"
)

var DataConnectionManager dao.CommandConnectionInterface

func Handler(iotRequest model.CommandRequest) error {
	// uid = the id of the command
	uid, _ := uuid.NewV4()
	fmt.Println("food:",iotRequest.Food)
	// TODO 2. generate command (model.command) with date in utc format. DateCommand: time.Now().UTC().Format(time.RFC3339)
	command := model.Command{}
	// TODO 3. save command in dynamo. see the function SaveCommand of the variable DataConnectonManager
	//saveCommandError := ??
	//if saveCommandError != nil {
	//	return saveCommandError
	//}
	return nil
}

func main() {
	//1. TODO initialize DataConnectionManager (see commandDao.go)
	DataConnectionManager = dao.CreateCommandConnection()
	lambda.Start(Handler)
}
