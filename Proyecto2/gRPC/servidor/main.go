package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"
	pb "so1-p2-201901758/server/gRPCserver"

	_ "github.com/go-sql-driver/mysql"
	"google.golang.org/grpc"
)

var ctx = context.Background()

// var rdb *redis.Client

type server struct {
	pb.UnimplementedGetInfoServer
}

const (
	port = ":3001"
)

var db *sql.DB

type Data struct {
	Carnet   string
	Nombre   string
	Curso    string
	Nota     string
	Semestre string
	Year     string
}

func sqlConnect() {
	var err error
	db, err = sql.Open("mysql", "root:password@tcp(34.67.54.164:3306)/SO1PROYECTO2")

	if err != nil {
		fmt.Println("Error al conectar a la base de datos:", err)
		return
	}
}

func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestId) (*pb.ReplyInfo, error) {
	fmt.Println("Recibí de cliente: ", in.GetCarnet())
	data := Data{
		Carnet:   in.GetCarnet(),
		Nombre:   in.GetNombre(),
		Curso:    in.GetCurso(),
		Nota:     in.GetNota(),
		Semestre: in.GetSemestre(),
		Year:     in.GetYear(),
	}
	fmt.Println(data)
	insertSQL(data)
	return &pb.ReplyInfo{Info: "Hola cliente, recibí el comentario"}, nil
}

func insertSQL(rank Data) {
	_, err := db.Exec("INSERT INTO alumno_cursos_calificaciones (carnet, nombre, curso, nota, semestre, año) VALUES (?, ?, ?, ?,?,?);",
		rank.Carnet, rank.Nombre, rank.Curso, rank.Nota, rank.Semestre, rank.Year)
	if err != nil {
		fmt.Println("Error al Insertar en la base de datos:", err)
		return
	}
}

//func getData(c *fiber.Ctx) error {
//	key := c.Params("key")
//
//	dataRet, _ := rdb.HGetAll(ctx, key).Result()
//	return c.JSON(fiber.Map{
//		"res": dataRet,
//	})
//}

func main() {
	listen, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})

	sqlConnect()

	if err := s.Serve(listen); err != nil {
		log.Fatalln(err)
	}
}
