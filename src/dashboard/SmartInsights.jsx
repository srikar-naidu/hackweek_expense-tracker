import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaFire, FaHourglassHalf } from "react-icons/fa";
import { formatCurrency } from "../utils/helpers.js";
import { getSmartInsights } from "../utils/calculations.js";

const SmartInsights = ({ expenses, budget, spent, percentage, monthlySummary }) => {
  const insights = getSmartInsights(expenses, budget, spent, percentage, monthlySummary);

  const ringOffset = 283 - (283 * insights.healthScore) / 100;
  const healthColor =
    insights.healthScore >= 70 ? "#22c55e" : insights.healthScore >= 40 ? "#f97316" : "#ef4444";

  return (
    <motion.section
      className="smart-insights glass-card card-3d"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <div className="smart-insights-header">
        <div className="smart-insights-badge">
          <FaBrain />
          <span>Smart Insights</span>
        </div>
        <p className="smart-insights-tag">Powered by your spending patterns</p>
      </div>

      <div className="smart-insights-body">
        <div className="health-score-ring">
          <svg viewBox="0 0 100 100" className="health-ring-svg">
            <circle cx="50" cy="50" r="45" className="health-ring-track" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className="health-ring-fill"
              stroke={healthColor}
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: ringOffset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="health-score-center">
            <span className="health-score-value">{Math.round(insights.healthScore)}</span>
            <span className="health-score-label">Health</span>
          </div>
        </div>

        <div className="smart-insights-stats">
          <div className="insight-stat">
            <FaFire className="insight-stat-icon" />
            <div>
              <span className="insight-stat-label">Daily burn rate</span>
              <span className="insight-stat-value">{formatCurrency(insights.dailyBurn)}/day</span>
            </div>
          </div>
          <div className="insight-stat">
            <FaHourglassHalf className="insight-stat-icon" />
            <div>
              <span className="insight-stat-label">Budget runway</span>
              <span className="insight-stat-value">{insights.runwayLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="smart-insight-message">
        <span className="insight-pulse" />
        {insights.message}
      </div>
    </motion.section>
  );
};

export default SmartInsights;
