import React from "react";
import { motion } from "framer-motion";
import Button from "./Button.jsx";

const EmptyState = ({ hasExpenses }) => {
  return (
    <motion.div
      className="empty-state glass-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
    >
      <div className="empty-illustration">
        <div className="empty-circle large" />
        <div className="empty-circle small" />
        <div className="empty-wallet">💳</div>
      </div>
      <h2 className="empty-title">
        {hasExpenses ? "No results match your filters" : "No expenses yet"}
      </h2>
      <p className="empty-subtitle">
        {hasExpenses
          ? "Try adjusting your search, filter or sort options."
          : "Start by adding your first expense and we’ll keep everything in sync for you."}
      </p>
      {!hasExpenses && (
        <Button
          variant="primary"
          onClick={() => {
            const el = document.querySelector(".expense-form-section");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        >
          Add your first expense
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;

