package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/cors"
)

type Cancion struct {
	Titulo          string `json:"titulo"`
	Artista         string `json:"artista"`
	AnioLanzamiento string `json:"anioLanzamiento"`
	Genero          string `json:"genero"`
}

var db *sql.DB

func main() {

	var err error
	//db, err = sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/SO1T3")
	db, err = sql.Open("mysql", "root:password@tcp(db:3306)/SO1T3")

	if err != nil {
		fmt.Println("Error al conectar a la base de datos:", err)
		return
	}
	//defer db.Close()
	err = db.Ping()
	if err != nil {
		fmt.Println("Error al conectar a la base de datos:", err)
		return
	}

	corsOptions := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST"},
	})

	http.Handle("/api/getMusic", corsOptions.Handler(http.HandlerFunc(getMusic)))
	http.Handle("/api/insertMusic", corsOptions.Handler(http.HandlerFunc(insertMusic)))

	fmt.Println("Server started on :8080")
	http.ListenAndServe(":8080", nil)
}

func getMusic(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT TituloAlbum, Artista, AnioLanzamiento, GeneroMusical FROM Canciones;")
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var canciones []Cancion

	for rows.Next() {
		var cancion Cancion
		err := rows.Scan(&cancion.Titulo, &cancion.Artista, &cancion.AnioLanzamiento, &cancion.Genero)
		if err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
		canciones = append(canciones, cancion)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(canciones); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}

func insertMusic(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var cancion Cancion
	err := json.NewDecoder(r.Body).Decode(&cancion)
	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("INSERT INTO Canciones (TituloAlbum, Artista, AnioLanzamiento, GeneroMusical) VALUES (?, ?, ?, ?);",
		cancion.Titulo, cancion.Artista, cancion.AnioLanzamiento, cancion.Genero)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	fmt.Printf("Nueva canción:\nTítulo: %s\nArtista: %s\nAño de lanzamiento: %s\nGénero: %s\n",
		cancion.Titulo, cancion.Artista, cancion.AnioLanzamiento, cancion.Genero)

	w.WriteHeader(http.StatusCreated)
}
