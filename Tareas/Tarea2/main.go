package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Student struct {
	Carnet string `json:"carnet"`
	Name   string `json:"name"`
}

func main() {
	http.HandleFunc("/data", studentHandler)
	fmt.Println("Server started on :8080")
	http.ListenAndServe(":8080", nil)
}

func studentHandler(w http.ResponseWriter, r *http.Request) {
	student := Student{
		Carnet: "201901758",
		Name:   "Erick Ivan Mayorga Rodriguez",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(student)
}