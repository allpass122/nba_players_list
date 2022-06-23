import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";

const instance = axios.create({
  baseURL: "http://localhost:9999/nba_players",
});

ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  legend: {
    position: "top",
    align: "start",
    display: true,
    itemWrap: true,
    labels: {
      fontSize: 200,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
};
const data = {
  labels: [],
  datasets: [
    {
      label: "# of Votes",
      data: [],
      backgroundColor: [
        "#ff6384cc",
        "#36a2ebcc",
        "#ffce56cc",
        "#4bc0c0cc",
        "#9966ffcc",
        "#ff9f40cc",
        "#43a047cc",
      ],
      borderColor: [
        "#ff638433",
        "#36a2eb33",
        "#ffce5633",
        "#4bc0c033",
        "#9966ff33",
        "#ff9f4033",
        "#43a04733",
      ],
      borderWidth: 1,
    },
  ],
};

export default function App() {
  // technical solution to make sure data fetch before render
  const [init, setInit] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    instance
      .get("/team_member")
      .then((response) => {
        var resp = response.data;

        console.log(resp);
        var labels = [];
        var dataset = [];
        resp.forEach((item) => {
          // console.log(item.team_acronym);
          labels.push(item.team_acronym);
          dataset.push(item.cnt);
        });
        data.labels = labels;
        data.datasets[0].data = dataset;
        setInit(true);
        // var r = JSON.stringify(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((err) => console.log(err));
  };
  return <>{init && <Pie data={data} options={options} height="1200" />}</>;
}
