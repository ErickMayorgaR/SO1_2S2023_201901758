"use client";


import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const MonitoreoHistorico = () => {
  const [datos, setDatos] = useState([]);

  // Obtenemos los datos de monitoreo histórico
  fetch("/api/monitoreoHistorico")
    .then((response) => response.json())
    .then((datos) => {
      setDatos(datos);
    });

  // Creamos un gráfico de línea con los datos de monitoreo histórico
  const chartData = {
    labels: datos.map((dato) => dato.fecha),
    datasets: [
      {
        label: "CPU",
        data: datos.map((dato) => dato.cpu),
        fill: false,
        lineTension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "black",
        pointBorderColor: "white",
      },
      {
        label: "Memoria",
        data: datos.map((dato) => dato.memoria),
        fill: false,
        lineTension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "black",
        pointBorderColor: "white",
      },
    ],
  };

  return (
    <div>
      <Line
        data={chartData}
        width={500}
        height={300}
        options={{
          legend: {
            display: true,
            position: "bottom",
          },
          title: {
            text: "Monitoreo histórico",
          },
        }}
      />
    </div>
  );
};

export default MonitoreoHistorico;
