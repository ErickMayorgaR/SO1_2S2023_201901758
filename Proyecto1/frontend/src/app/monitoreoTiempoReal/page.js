"use client";


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../../components/Graph';
import Table from "../../components/Table";
import Navbar from "../../components/navbar";

import "./tiempoReal.css";


const MonitoreoEnTiempoReal = () => {
  const [maquina, setMaquina] = useState('');
  const [ram, setRam] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [procesos, setProcesos] = useState([]);
  const [interval, setInterval] = useState(10000); // 1 segundo
  const [maxMaquinas, setMaxMaquinas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
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

      const vmData = await axios.get('http://localhost:5000/getVMs');
      const maxMaquinas = vmData.data[0].Valor;

      setMaxMaquinas(maxMaquinas);
      console.log(maxMaquinas, "numero maximo de maquinas");

      setRam(ramData.data[0].porcentaje);
      setCpu(cpuData.data[0].porcentaje);
      // setProcesos(procesosData.data);
    };

    fetchData();

    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return (
    <div className="container">
      <div className="navbar-container">
        <Navbar></Navbar>
      </div>

      <div className="title-container">
      <select id="maquina">
          {Array.from({length: maxMaquinas}, (_, i) => i + 1).map(i => (
            <option key={i} value={i}>Maquina {i}</option>
          ))}
        </select>
      </div>
      <div className="graphs-container">
        <div className="graph-container">
          <Graph
            title="Uso de la RAM"
            data={ram}
          />
        </div>
        <div className="graph-container">
          <Graph
            title="Uso del CPU"
            data={cpu}
          />
        </div>
      </div>
      <div className="table-container">
        <Table
          data={procesos}
          header={[
            'PID',
            'Nombre',
            'Usuario',
            'Estado',
            '%RAM',
          ]}
        />
      </div>
    </div>
  );
};

export default MonitoreoEnTiempoReal;
