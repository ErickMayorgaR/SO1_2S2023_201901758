"use client";


import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Navbar from "./../../components/navbar";
import axios from 'axios';
import Graph from "../../components/graph";
import GraphBar from "../../components/graphBarPromedio";




const Mysql = () => {
    const [cursos, setCursos] = useState([]);
    const [semestres, setSemestres] = useState([]);
    const [aprobados, setAprobados] = useState([]);
    const [promedios, setPromedios] = useState([]);
    const [cursosMasTomados, setCursosMasTomados] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:4000/getInfo")
            .then((response) => {
                setCursos(response.data.cursos)
                setSemestres(response.data.semestres)
            });


    }, []);

    // Manejar el cambio en la lista desplegable de cursos
    const handleChangeValorAprobacion = (e) => {
        const semestreSeleccionado = document.getElementById("semestre").value;
        const cursoSeleccionado = document.getElementById("curso").value;

        // Obtener los aprobados para el curso seleccionado
        axios
            .get("http://localhost:4000/getPorcentajeAprobacion",
                {
                    params: {
                        curso: cursoSeleccionado,
                        semestre: semestreSeleccionado
                    },
                }
            )
            .then((response) => {
                setAprobados(response.data.data);
            });
    };

    const handleMayorCantidadEstudiantes = (e) => {
        const semestreSeleccionado = document.getElementById("semestreCantidad").value;

        // Obtener los aprobados para el curso seleccionado
        axios
            .get("http://localhost:4000/getMejorPromedio",
                {
                    params: {
                        semestre: semestreSeleccionado
                    },
                }
            )
            .then((response) => {
                setPromedios(response.data.mayorCantidadEstudiantes);
            });
    }

    const handleMejorPromedio = (e) => {
        const semestreSeleccionado = document.getElementById("semestreCurso").value;

        // Obtener los aprobados para el curso seleccionado
        axios
            .get("http://localhost:4000/getMejorPromedio",
                {
                    params: {
                        semestre: semestreSeleccionado
                    },
                }
            )
            .then((response) => {
                setCursosMasTomados(response.data.estudiante);
            });
    }
    
  

    return (
        <div className="container">
            <div className="navbar-container">
                <Navbar></Navbar>
            </div>
            <div className="title-container">
            </div>
            <div className="graphs-container">
                <div className="graph-container">

                    <div className="listas-desplegables">
                        <select name="curso" id="curso" onChange={handleChangeValorAprobacion}>
                            {
                                cursos.map((curso, index) => (
                                    <option value={curso.curso} key={index}>{curso.curso}</option>
                                )).sort()
                            }
                        </select>

                        <select
                            name="semestre"
                            id="semestre"
                            onChange={handleChangeValorAprobacion}
                        >
                            {
                                semestres.map((semestre, index) => (
                                    <option value={semestre.semestre} key={index}>{semestre.semestre}</option>
                                ))}
                        </select>
                    </div>
                    <Graph
                        title="porcentaje de aprobacion curso"
                        data={aprobados}
                    />
                </div>
                <div className="graph-container">

                    <div className="listas-desplegables">
                        <select name="semestrePromedio" id="semestrePromedio" onChange={handleMayorCantidadEstudiantes}  defaultValue={"2S"}>
                            {
                                semestres.map((semestre, index) => (
                                    <option value={semestre.semestre} key={index}>{semestre.semestre}</option>
                                )).sort()
                            }
                        </select>
                    
                    </div>
                    <GraphBar
                        title="Alumnos Con Mejor Promedio"
                        data={promedios}
                    />
                </div>
                <div className="graph-container">
                    <div className="listas-desplegables">
                        <select name="semestreCurso" id="semestreCurso" onChange={handleMejorPromedio} defaultValue={"2S"}> 
                            {
                                cursos.map((curso, index) => (
                                    <option value={curso.curso} key={index}>{curso.curso}</option>
                                )).sort()
                            }
                        </select>
                    </div>
                    <GraphBar
                        title="Cursos con Mayor Numero de Alumnos"
                        data={cursosMasTomados}
                    />
                </div>
            </div>
        </div>


    );

};

export default Mysql;