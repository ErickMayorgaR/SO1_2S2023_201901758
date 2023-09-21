"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './Graph';
import Table from "./Table";


const MonitoreoEnTiempoReal = () => {
  const [maquina, setMaquina] = useState('');
  const [ram, setRam] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [procesos, setProcesos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/getRAMInfo').then((res) => {
      setMaquina(res.data.porcentaje);
    });

    axios.get('http://localhost:5000/getCPUInfo').then((res) => {
      setMaquina(res.data.porcentaje);
    });

  }, []);

  return (
    <div>
      <h1>Monitoreo en Tiempo Real</h1>
      <div className="select-machine">
        <label htmlFor="maquina">Máquina</label>
        <select id="maquina" onChange={(e) => setMaquina(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="maquina-1">Máquina 1</option>
          <option value="maquina-2">Máquina 2</option>
        </select>
      </div>
      <Graph
        title="Uso de la RAM"
        data={ram}
      />
      <Graph
        title="Uso del CPU"
        data={cpu}
      />
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
  );
};

export default MonitoreoEnTiempoReal;