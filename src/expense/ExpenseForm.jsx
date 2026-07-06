import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { formatISODate } from "../utils/helpers.js";
import { createExpense, updateExpense } from "../utils/helpers.js";

const initialState = {
  title: "",
  amount: "",
  category: "Food",
  date: formatISODate(new Date())
};

const ExpenseForm = ({
  categories,
  expenses,
  setExpenses,
  editingExpense,
  setEditingExpense
}) => {
  const [form, setForm] = useState(initialState);
  const formSectionRef = useRef(null);
  const amountInputRef = useRef(null);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        amount: String(editingExpense.amount),
        category: editingExpense.category,
        date: editingExpense.date
      });

      const scrollAndFocus = window.setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        amountInputRef.current?.focus();
      }, 80);

      return () => window.clearTimeout(scrollAndFocus);
    }

    setForm(initialState);
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountNumber = Number(form.amount);

    if (!form.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    if (!form.date) {
      toast.error("Please select a date");
      return;
    }

    if (editingExpense) {
      const updated = updateExpense(expenses, editingExpense.id, {
        ...editingExpense,
        title: form.title.trim(),
        amount: amountNumber,
        category: form.category,
        date: form.date
      });
      setExpenses(updated);
      setEditingExpense(null);
      toast.success("Expense updated");
    } else {
      const created = createExpense(expenses, {
        title: form.title.trim(),
        amount: amountNumber,
        category: form.category,
        date: form.date
      });
      setExpenses(created);
      toast.success("Expense added");
      setForm(initialState);
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setForm(initialState);
  };

  const isEditing = Boolean(editingExpense);

  return (
    <section className="expense-form-section glass-card" ref={formSectionRef}>
      <div className="expense-form-header">
        <div>
          <h2 className="section-title">
            {isEditing ? "Update expense" : "Add new expense"}
          </h2>
          <p className="section-subtitle">
            Capture every transaction with clean, minimal input.
          </p>
        </div>
      </div>
      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-field">
            <span>Title</span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Groceries at supermarket"
            />
          </label>
        </div>
        <div className="form-row two-col">
          <label className="form-field">
            <span>Amount</span>
            <div className="amount-input-wrapper">
              <span className="amount-prefix">₹</span>
              <input
                ref={amountInputRef}
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </label>
          <label className="form-field">
            <span>Category</span>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label className="form-field">
            <span>Date</span>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-actions">
          {isEditing && (
            <motion.button
              type="button"
              className="btn ghost"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCancelEdit}
            >
              Cancel
            </motion.button>
          )}
          <motion.button
            type="submit"
            className="btn primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            {isEditing ? "Update Expense" : "Add Expense"}
          </motion.button>
        </div>
      </form>
    </section>
  );
};

export default ExpenseForm;

