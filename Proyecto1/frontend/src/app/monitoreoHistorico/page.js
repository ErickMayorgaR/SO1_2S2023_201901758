"use client";


import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import Navbar from "./../../components/navbar";
import "./tiempoHistorico.css";

ChartJS.register(...registerables);

const MonitoreoHistorico = () => {
  const [datosRAM, setDatosRAM] = useState([]);
  const [datosCPU, setDatosCPU] = useState([]);
  const [fechas, setFechas] = useState([]);

  useEffect(() => {
    // Obtenemos los datos de RAM y CPU
    fetch("http://localhost:5000/getRAMInfo")
      .then((response) => response.json())
      .then((datos) => {
        const ramData = datos.map((dato) => dato.porcentaje);
        const fechas = datos.map((dato) => dato.fecha);
        setDatosRAM(ramData);
        setFechas(fechas);
      });

    fetch("http://localhost:5000/getCPUInfo")
      .then((response) => response.json())
      .then((datos) => {
        const cpuData = datos.map((dato) => dato.porcentaje);
        setDatosCPU(cpuData);
      });
  }, []);

  // Define la data para las gráficas
  const ramData = {
    labels: fechas.map((fecha) => fecha.substring(0, 19)),
    datasets: [
      {
        label: "Monitoreo histórico de RAM",
        data: datosRAM,
        fill: false,
        borderColor: "white",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "white",
      },
    ],
  };

  const cpuData = {
    labels: fechas.map((fecha) => fecha.substring(0, 19)),
    datasets: [
      {
        label: "Monitoreo histórico de CPU",
        data: datosCPU,
        fill: false,
        borderColor: "white",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "white",
      },
    ],
  };

  return (
    <div className="monitoreo-historico">
      <div className="navbar-container">
        <Navbar></Navbar>
      </div>
      <h1>Monitoreo histórico</h1>
      <div className="graficas-container">
        <div className="grafica-container">
          <Line data={ramData} width={500} height={300} />
        </div>
        <div className="grafica-container">
          <Line data={cpuData} width={500} height={300} />
        </div>
      </div>
    </div>
  );
};

export default MonitoreoHistorico;
