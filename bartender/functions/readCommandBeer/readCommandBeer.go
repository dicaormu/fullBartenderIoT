package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"bartenderAsFunction/model"
	"time"
	"bartenderAsFunction/dao"
	"github.com/satori/go.uuid"
	"fmt"
)

var DataConnectionManager dao.CommandConnectionInterface

func Handler(iotRequest model.CommandRequest) error {
	// uid = the id of the command
	uid, _ := uuid.NewV4()
	fmt.Println("beer:", iotRequest.Beer)
	//2. TODO generate command (model.command) with date in utc format (time.Now().UTC().Format(time.RFC3339))
	command := model.Command{}
	//3. TODO save command in dynamo
	//  -> Get all commands for client
	commands, err := DataConnectionManager.GetCommandsByClient(command.Client)
	if err != nil {
		return err
	}
	if shouldSaveCommand(commands, time.Now()) {
		saveCommandError := DataConnectionManager.SaveCommand(command)
		if saveCommandError != nil {
			return saveCommandError
		}
	}
	return nil
}

//4. TODO verify if there is not command in the last 2 minutes
func shouldSaveCommand(commands []model.Command, actualDate time.Time) bool {
	for _, val := range commands {
		if val.Beer.Amount >0  {
				dateCommand, _ := time.Parse(time.RFC3339, val.DateCommand)
				fmt.Println("dateCommand", dateCommand)
				fmt.Println("actualDate", actualDate)
				// 2 - minutes to hold
				// 4.1 TODO compare dates to see if there has been 2 minutes
			}
		}
	}
	return true
}

func main() {
	//1. TODO initialize DataConnectionManager (see commandDao.go)
	//DataConnectionManager = ??
	lambda.Start(Handler)
}
