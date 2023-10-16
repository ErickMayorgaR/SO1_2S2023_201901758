package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gomodule/redigo/redis"
	"github.com/rs/cors"
)

type Album struct {
	Name   string `json:"name"`
	Artist string `json:"artist"`
	Year   int    `json:"year"`
}

func main() {
	corsOptions := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	})

	http.Handle("/insertAlbum", corsOptions.Handler(http.HandlerFunc(insertAlbum)))

	fmt.Println("Server started on :8080")

	err := http.ListenAndServe(":8080", nil)

	// Comprobar el error
	if err != nil {
		// El servidor falló
		log.Fatal(err)
	}
}

func insertAlbum(w http.ResponseWriter, r *http.Request) {

	// Conectar a Redis
	client, err := redis.Dial("tcp", "localhost:6379")
	if err != nil {
		panic(err)
	}
	defer client.Close()

	if r.Method != http.MethodPost {
		http.Error(w, "Metodo No Permitido", http.StatusMethodNotAllowed)
		return
	}

	album := Album{}

	err = json.NewDecoder(r.Body).Decode(&album)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	key := fmt.Sprintf("album:%s", album.Name)
	_, err = client.Do("SET", key, album.String())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Enviar una respuesta de éxito
	data := struct {
		Status  string `json:"status"`
		Mensaje string `json:"mensaje"`
	}{
		Status:  "ok",
		Mensaje: "Album Insertado Exitosamente",
	}
	json.NewEncoder(w).Encode(data)
}

func (a Album) String() string {
	return fmt.Sprintf("{\"name\":\"%s\",\"artist\":\"%s\",\"year\":%d}", a.Name, a.Artist, a.Year)
}
