import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import "./LineCharts.css"

export default function LineCharts() {
  const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"];
  return (
    <div className="bg-white rounded-md shadow-md mt-5 px-5 py-5">
      <h1 className="text-xl font-semibold mb-2">Total Users & Total Sales</h1>
      <Box sx={{ width: "100%", height: 500 }}>
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: xLabels,
              // tickSize: 8,
              tickLabelStyle: { fontSize: 12 },
              axisLine: { stroke: "#000", strokeWidth: 5 },
              tickLine: { stroke: "#000", strokeWidth: 5 },
            },
          ]}
          yAxis={[
            {
              // tickSize: 8,
              tickLabelStyle: { fontSize: 12 },
              axisLine: { stroke: "#000", strokeWidth: 5 },
              tickLine: { stroke: "#000", strokeWidth: 5 },
            },
          ]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              label: "Total Users",
            },
            {
              data: [3, 5.4, 5, 6.5, 2.5, 9],
              label: "Total Sales",
            },
          ]}
          height={500}
        />
      </Box>
    </div>
  );
}
