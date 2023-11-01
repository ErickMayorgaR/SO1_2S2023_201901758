import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const GraphBarPromedio = ({ title, data }) => {
  const [options, setOptions] = useState({
    title: title,
    xaxis: {
      title: "Alumnos",
      type: "category",
    },
    yaxis: {
      title: "Nota",
    },
  });

  useEffect(() => {
    if (data.length > 0) {
      setOptions({
        xaxis: {
          categories: data.map((item) => item.carne),
        },
        yaxis: {
          ticks: data.map((item) => item.promedio),
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

export default GraphBarPromedio;
