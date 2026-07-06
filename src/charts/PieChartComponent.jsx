import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#f97316", "#fb923c", "#fbbf24", "#ea580c", "#c2410c", "#fcd34d", "#f59e0b", "#fdba74", "#fed7aa"];

const PieChartComponent = ({ data }) => {
  return (
    <motion.div
      className="chart-card glass-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="chart-title">Expenses by Category</h3>
      <div className="chart-inner">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "#1c1917", border: "1px solid rgba(251,146,60,0.3)" }}
              labelStyle={{ color: "#fafaf9" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PieChartComponent;

