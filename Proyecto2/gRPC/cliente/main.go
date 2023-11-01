package main

import (
	"context"
	"fmt"
	"log"
	pb "so1-p2-201901758/client/gRPCclient"

	"strconv"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var ctx = context.Background()

type Data struct {
	Carnet   int
	Nombre   string
	Curso    string
	Nota     int
	Semestre string
	Year     int
}

func insertData(c *fiber.Ctx) error {
	// Descomprime el JSON de entrada.
	var data map[string]interface{}
	e := c.BodyParser(&data)
	if e != nil {
		return e
	}

	// Crea un objeto Data con los valores convertidos.
	rank := Data{
		Carnet:   int(data["carnet"].(float64)),
		Nombre:   data["nombre"].(string),
		Curso:    data["curso"].(string),
		Nota:     int(data["nota"].(float64)),
		Semestre: data["semestre"].(string),
		Year:     int(data["year"].(float64)),
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
		Carnet:   strconv.Itoa(rank.Carnet),
		Nombre:   rank.Nombre,
		Curso:    rank.Curso,
		Nota:     strconv.Itoa(int(rank.Nota)),
		Semestre: rank.Semestre,
		Year:     strconv.Itoa(int(rank.Year)),
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

	err := app.Listen(":3004")
	if err != nil {
		return
	}
}
