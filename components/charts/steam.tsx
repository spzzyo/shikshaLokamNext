import React from "react";
import Chart, { Props } from "react-apexcharts";

const state: Props["series"] = [
  {
    name: "High Achievers",
    data: [20, 40, 55, 65, 75, 85, 90, 95, 97, 99], // Mostly ahead, slight dips
  },
  {
    name: "Consistent Performers",
    data: [15, 35, 45, 55, 65, 70, 78, 83, 88, 90], // Gradual improvement
  },
  {
    name: "Late Bloomers",
    data: [10, 20, 30, 50, 55, 65, 80, 85, 87, 89], // Slow start, strong finish
  },
  {
    name: "Fluctuating Learners",
    data: [30, 25, 40, 60, 50, 70, 65, 85, 75, 95], // More ups and downs
  },
  {
    name: "Struggling Students",
    data: [25, 30, 35, 40, 50, 55, 60, 65, 70, 75], // Steady but slower growth
  },
];



const options: Props["options"] = {
  chart: {
    type: "area",
    animations: {
      easing: "linear",
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    id: "basic-bar",
    foreColor: "hsl(var(--nextui-default-800))",
    stacked: false,
    toolbar: {
      show: false,
    },
  },

  xaxis: {
    categories: [
      "January", "February", "March", "April", "July", "August", "September", "November", "December"
    ],
    labels: {
      // show: false,
      style: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
    axisBorder: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
    axisTicks: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
  },
  yaxis: {
    labels: {
      style: {
        // hsl(var(--nextui-content1-foreground))
        colors: "hsl(var(--nextui-default-800))",
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: true,
    borderColor: "hsl(var(--nextui-default-200))",
    strokeDashArray: 0,
    position: "back",
  },
  stroke: {
    curve: "smooth",
    fill: {
      colors: ["red"],
    },
  },
  // @ts-ignore
  markers: false,
};

export const Steam = () => {
  return (
    <>
      <div className="w-full z-20">
        <div id="chart">
          <Chart options={options} series={state} type="area" height={425} />
        </div>
      </div>
    </>
  );
};
