import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarGraphic: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      aspect={5 / 3}
      className="flex items-center justify-center"
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="activo" fill="#8884d8" />
        <Bar dataKey="inactivo" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraphic;
