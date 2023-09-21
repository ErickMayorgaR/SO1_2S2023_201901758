import React from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const Graph = ({ title, data }) => {
  const chartData = {
    labels: ["Uso"],
    datasets: [
      {
        label: title,
        data: [data],
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
      <h3>{title}</h3>
      <Chart type="line" data={chartData} />
    </div>
  );
};

export default Graph;
