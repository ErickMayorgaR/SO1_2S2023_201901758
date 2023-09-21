"use client";


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../../components/Graph';
import Table from "../../components/Table";
import Navbar from "../../components/navbar";

import "./tiempoReal.css";


const MonitoreoEnTiempoReal = () => {
  const [maquina, setMaquina] = useState(null);
  const [ram, setRam] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [procesos, setProcesos] = useState([]);
  const [intervalo, setIntervalo] = useState(5000); // 10 segundos
  const [maxMaquinas, setMaxMaquinas] = useState(0);
  const [pid, setPid] = useState('');


  const handleChangeMaquina = (event) => {
    setMaquina(parseInt(event.target.value));
  };

  const handleKillProcess = async () => {
    const data = {
      maquina: maquina,
      pid: pid,
    };
    try {
      const response = await axios.post(`http://localhost:5000/killProcess`, data);

      if (response.status === 200) {
        alert('Proceso eliminado correctamente.');
      } else {
        alert('Error al eliminar el proceso.');
      }
    } catch (err) {
      console.log("Hubo un error" + err);

    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const vmData = await axios.get('http://localhost:5000/getVMs');
        const maxMaquinas = vmData.data[0].Valor;
        setMaxMaquinas(maxMaquinas);
      } catch (err) {
        console.log("Hubo un error" + err);
      }

      try {
        const procesosData = await axios.get(
          'http://localhost:5000/getPIDInfo',
          {
            params: {
              maquina: maquina,
            },
          }
        );
        setProcesos(procesosData.data);
      } catch (err) {
        setProcesos([]);

        console.log("Hubo un error" + err);

      }

      try {
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
        setRam(ramData.data[0].porcentaje);
        setCpu(cpuData.data[0].porcentaje);
      } catch (err) {
        console.log("Hubo un error" + err);
      }

      console.log(maquina, "maquinas");
    };
    fetchData();

    const intervalId = setInterval(fetchData, intervalo);

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonta
  }, [intervalo, maquina]);

  return (
    <div className="container">
      <div className="navbar-container">
        <Navbar></Navbar>
      </div>

      <div className="title-container">
        <select id="maquina" onChange={handleChangeMaquina}>
          {Array.from({ length: maxMaquinas }, (_, i) => i + 1).map(i => (
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
      <div className="kill-process-container">
        <input
          type="number"
          placeholder="PID del proceso a eliminar"
          value={pid}
          onChange={(event) => setPid(event.target.value)}
        />
        <button onClick={handleKillProcess}>Kill</button>
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
