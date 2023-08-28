package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type RAMInfo struct {
	TotalRAM      uint64  `json:"totalRAM"`
	RAMEnUso      uint64  `json:"RAMEnUso"`
	RAMLibre      uint64  `json:"RAMLibre"`
	PorcentajeUso float64 `json:"porcentajeUso"`
}

func main() {
	http.HandleFunc("/get-ram-info", getRAMInfoHandler)
	fmt.Println("Server started on :8080")

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func getRAMInfoHandler(w http.ResponseWriter, r *http.Request) {
	data, err := os.ReadFile("/proc/ram_201901758")
	if err != nil {
		http.Error(w, fmt.Sprintf("Internal Server Error: %s", err), http.StatusInternalServerError)
		return
	}

	ramInfo := parseRAMInfo(string(data))
	ramInfo.PorcentajeUso = calculateUsagePercent(ramInfo.RAMEnUso, ramInfo.TotalRAM)

	w.Header().Set("Content-Type", "application/json")
	jsonData, err := json.Marshal(ramInfo)
	if err != nil {
		http.Error(w, fmt.Sprintf("Internal Server Error: %s", err), http.StatusInternalServerError)
		return
	}

	w.Write(jsonData)
}

func parseRAMInfo(data string) RAMInfo {
	var ramInfo RAMInfo
	fmt.Sscanf(data, "Total_RAM: %d\nRAM_en_Uso: %d\nRAM_libre: %d\nPorcentaje_en_uso: %f\n",
		&ramInfo.TotalRAM, &ramInfo.RAMEnUso, &ramInfo.RAMLibre, &ramInfo.PorcentajeUso)
	return ramInfo
}

func calculateUsagePercent(usedMemory, totalMemory uint64) float64 {
	return (float64(usedMemory) / float64(totalMemory) * 100)
}
