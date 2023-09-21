"use client";


import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import Navbar from "./../../components/navbar";
import "./tiempoHistorico.css";
import axios from 'axios';


ChartJS.register(...registerables);

const MonitoreoHistorico = () => {
  const [datosRAM, setDatosRAM] = useState([]);
  const [datosCPU, setDatosCPU] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [intervalo, setIntervalo] = useState(10000); // 10 segundos
  const [maquina, setMaquina] = useState(null);
  const [maxMaquinas, setMaxMaquinas] = useState(0);


  const handleChangeMaquina = (event) => {
    setMaquina(parseInt(event.target.value));
  };


  useEffect(() => {
    const fetchData = async () => {
      const vmData = await axios.get('http://localhost:5000/getVMs');
      const maxMaquinas = vmData.data[0].Valor;
      setMaxMaquinas(maxMaquinas);

      const ramData = await axios.get(
        'http://localhost:5000/getRAMInfo',
        {
          params: {
            maquina: maquina,
          },
        }
      );
      const cpuData = await axios.get(
        'http://localhost:5000/getCPUInfo',
        {
          params: {
            maquina: maquina,
          },
        }
      );
      const mapCpuData = cpuData.data.map((dato) => dato.porcentaje);
      setDatosCPU(mapCpuData);

      const mapRamData = ramData.data.map((dato) => dato.porcentaje);
      setDatosRAM(mapRamData);

      const mapFechas = ramData.data.map((dato) => dato.fecha);
      setFechas(mapFechas);

    };



    fetchData();

    const intervalId = setInterval(fetchData, intervalo);

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonta
  }, [intervalo, maquina]);

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
      <select id="maquina" onChange={handleChangeMaquina}>
          {Array.from({ length: maxMaquinas }, (_, i) => i + 1).map(i => (
            <option key={i} value={i}>Maquina {i}</option>
          ))}
        </select>
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
