import React from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const Graph = ({ title, data }) => {
  const chartData = {
    labels: ["Utilizado", "Sin Usar"],
    datasets: [
      {
        labels: [title,"Sin Usar"],
        data: [data, 100 - data],
        fill: true,
        backgroundColor: ["blue","lightgray"],
        borderColor: "white",
        circumference: 360,
        rotation: 90,        
        animation: false,
      
      },
    ],
  };

  return (
    <div>
      <h3>{title}</h3>
      <Chart type="pie" data={chartData} />
    </div>
  );
};


export default Graph;
