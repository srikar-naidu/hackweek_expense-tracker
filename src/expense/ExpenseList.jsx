import React from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ExpenseCard from "./ExpenseCard.jsx";
import { deleteExpenseById } from "../utils/helpers.js";

const ExpenseList = ({ expenses, setExpenses, setEditingExpense }) => {
  const handleDelete = (id) => {
    setExpenses((prev) => deleteExpenseById(prev, id));
    toast.success("Expense deleted");
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <section className="expense-list-section glass-card">
      <div className="expense-list-header">
        <div>
          <h2 className="section-title">Transactions</h2>
          <p className="section-subtitle">
            All your expenses for this month in one place.
          </p>
        </div>
        <div className="expense-count">{expenses.length} records</div>
      </div>
      <div className="expense-list">
        <AnimatePresence mode="popLayout">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ExpenseList;

