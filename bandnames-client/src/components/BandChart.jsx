import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import Chart from "chart.js/auto";
export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("bandList", (bands) => {
      crearGrafica(bands);
    });
  }, [socket]);

  let myChart = null;
  const crearGrafica = (bands = []) => {
    const ctx = document.getElementById("myChart");
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map((band) => band.votes),
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return <canvas id="myChart"></canvas>;
};
