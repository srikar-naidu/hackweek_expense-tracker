import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { formatCurrency } from "../utils/helpers.js";

const getProgressColor = (percentage) => {
  if (percentage <= 60) return "var(--accent-green)";
  if (percentage <= 100) return "var(--accent-amber)";
  return "var(--accent-red)";
};

const BudgetProgress = ({ budget, setBudget, clearBudget, spent, remaining, percentage }) => {
  const [inputValue, setInputValue] = useState(budget ? String(budget) : "");

  useEffect(() => {
    setInputValue(budget ? String(budget) : "");
  }, [budget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(inputValue);
    if (!Number.isFinite(value) || value <= 0) return;
    setBudget(value);
  };

  const handleClearBudget = () => {
    clearBudget();
    toast.success("Budget cleared from your view and storage.");
  };

  const color = getProgressColor(percentage);
  const clamped = Math.min(percentage, 150);

  return (
    <section className="budget-section glass-card">
      <div className="budget-header">
        <div>
          <h2 className="budget-title">Monthly Budget</h2>
          <p className="budget-subtitle">
            Keep your spending within a healthy range with a simple budget.
          </p>
        </div>
        <form className="budget-form" onSubmit={handleSubmit}>
          <label className="budget-label">
            <span>Budget (per month)</span>
            <div className="budget-input-wrapper">
              <span className="budget-input-prefix">₹</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="budget-input"
                placeholder="Enter budget"
              />
            </div>
          </label>
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="btn primary"
          >
            {budget ? "Update Budget" : "Set Budget"}
          </motion.button>
        </form>
        <div className="budget-actions">
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="button"
            className="btn secondary budget-clear"
            onClick={handleClearBudget}
            disabled={budget <= 0}
          >
            Clear Budget
          </motion.button>
        </div>
      </div>

      <div className="budget-progress-wrapper">
        <div className="budget-progress-bar">
          <div className="budget-progress-track" />
          <motion.div
            className="budget-progress-fill"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(clamped, 150)}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="budget-metrics">
          <div className="budget-metric">
            <span className="metric-label">Remaining</span>
            <span className="metric-value">
              {budget > 0 ? formatCurrency(remaining) : "—"}
            </span>
          </div>
          <div className="budget-metric">
            <span className="metric-label">Spent</span>
            <span className="metric-value">{formatCurrency(spent)}</span>
          </div>
          <div className="budget-metric">
            <span className="metric-label">Used</span>
            <span className="metric-value">
              {budget > 0 ? `${percentage.toFixed(1)}%` : "—"}
            </span>
          </div>
        </div>
        {budget > 0 && percentage > 100 && (
          <div className="budget-warning">
            You have exceeded your budget. Consider lowering non-essential expenses this
            month.
          </div>
        )}
      </div>
    </section>
  );
};

export default BudgetProgress;

