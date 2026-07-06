import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getCategoryMeta, formatCurrency, formatDisplayDate } from "../utils/helpers.js";

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  const meta = getCategoryMeta(expense.category);

  return (
    <motion.article
      className="expense-card glass-card"
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25 }}
    >
      <div className="expense-card-left">
        <div className="expense-avatar" style={{ background: meta.bg }}>
          <span className="expense-avatar-icon">{meta.icon}</span>
        </div>
        <div className="expense-card-main">
          <div className="expense-title-row">
            <h3 className="expense-title">{expense.title}</h3>
          </div>
          <div className="expense-meta">
            <span className="expense-category">{meta.icon} {expense.category}</span>
            <span className="expense-dot">•</span>
            <span className="expense-date">{formatDisplayDate(expense.date)}</span>
          </div>
        </div>
      </div>
      <div className="expense-card-right">
        <div className="expense-amount">{formatCurrency(expense.amount)}</div>
        <div className="expense-actions">
          <motion.button
            type="button"
            className="icon-btn subtle"
            onClick={() => onEdit(expense)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEdit />
          </motion.button>
          <motion.button
            type="button"
            className="icon-btn danger"
            onClick={() => onDelete(expense.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTrash />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default ExpenseCard;

