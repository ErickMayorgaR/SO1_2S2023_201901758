import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const GraphBarCurso = ({ title, data }) => {
  const [options, setOptions] = useState({
    title: title,
    xaxis: {
      title: "Cursos",
      type: "category",
    },
    yaxis: {
      title: "Cantidad estudiantes",
    },
  });

  useEffect(() => {
    if (data.length > 0) {
      setOptions({
        xaxis: {
          categories: data.map((item) => item.curso),
        },
        yaxis: {
          ticks: data.map((item) => item.cantidad_estudiantes),
        },
      });
    }
  }, [data]);

  return (
    <Bar
      data={data}
      options={options}
    />
  );
};

export default GraphBarCurso;
