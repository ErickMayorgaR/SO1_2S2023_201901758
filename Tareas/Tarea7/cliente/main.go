package main

import (
	"context"
	"fmt"
	"log"
	pb "so1-t7-201901758/gRPCclient"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var ctx = context.Background()

type Data struct {
	Carnet   string
	Nombre   string
	Curso    string
	Nota     string
	Semestre string
	Year     string
}

func insertData(c *fiber.Ctx) error {
	var data map[string]string
	e := c.BodyParser(&data)
	if e != nil {
		return e
	}

	rank := Data{
		Carnet:   data["carnet"],
		Nombre:   data["year"],
		Curso:    data["curso"],
		Nota:     data["nota"],
		Semestre: data["semestre"],
		Year:     data["year"],
	}

	sendRedisServer(rank)
	// go sendMysqlServer(rank)

	return nil
}

func sendRedisServer(rank Data) {
	conn, err := grpc.Dial("localhost:3001", grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock())
	if err != nil {
		log.Fatalln(err)
	}

	cl := pb.NewGetInfoClient(conn)
	defer func(conn *grpc.ClientConn) {
		err := conn.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}(conn)

	ret, err := cl.ReturnInfo(ctx, &pb.RequestId{
		Carnet:   rank.Carnet,
		Nombre:   rank.Nombre,
		Curso:    rank.Curso,
		Nota:     rank.Nota,
		Semestre: rank.Semestre,
		Year:     rank.Year,
	})
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println("Respuesta del server " + ret.GetInfo())
}

func sendMysqlServer(rank Data) {

}

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"res": "todo bien",
		})
	})
	app.Post("/insert", insertData)

	err := app.Listen(":3000")
	if err != nil {
		return
	}
}
