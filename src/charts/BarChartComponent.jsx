import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { motion } from "framer-motion";

const BarChartComponent = ({ data }) => {
  return (
    <motion.div
      className="chart-card glass-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <h3 className="chart-title">Monthly Expenses</h3>
      <div className="chart-inner">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(251,146,60,0.1)" />
            <XAxis dataKey="month" stroke="#a8a29e" />
            <YAxis stroke="#a8a29e" />
            <Tooltip
              contentStyle={{ background: "#1c1917", border: "1px solid rgba(251,146,60,0.3)" }}
              labelStyle={{ color: "#fafaf9" }}
            />
            <Bar dataKey="total" fill="url(#colorTotal)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default BarChartComponent;

