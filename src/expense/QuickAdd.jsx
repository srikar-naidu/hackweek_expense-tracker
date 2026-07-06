import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaRedo, FaPlus } from "react-icons/fa";
import { createExpense, formatCurrency, formatISODate } from "../utils/helpers.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import {
  ALL_QUICK_PRESETS,
  QUICK_ADD_GROUPS,
  QUICK_ADD_TABS
} from "../data/quickAddPresets.js";
import { categories } from "../data/categories.js";

const MAX_RECENT = 8;

const QuickAdd = ({ expenses, setExpenses }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [recentIds, setRecentIds] = useLocalStorage("quick-add-recent", []);
  const [customForm, setCustomForm] = useState({
    title: "",
    amount: "",
    category: "Food"
  });

  const addExpense = (preset) => {
    const updated = createExpense(expenses, {
      title: preset.title,
      amount: preset.amount,
      category: preset.category,
      date: formatISODate(new Date())
    });
    setExpenses(updated);

    if (preset.id) {
      setRecentIds((prev) => {
        const next = [preset.id, ...prev.filter((id) => id !== preset.id)];
        return next.slice(0, MAX_RECENT);
      });
    }

    toast.success(`${preset.title} — ${formatCurrency(preset.amount)}`);
  };

  const handleRepeatLast = () => {
    if (expenses.length === 0) {
      toast.error("No expenses to repeat yet");
      return;
    }
    const last = expenses[0];
    addExpense({
      id: `repeat-${last.id}`,
      title: last.title,
      amount: last.amount,
      category: last.category
    });
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const amount = Number(customForm.amount);
    if (!customForm.title.trim()) {
      toast.error("Enter a title");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    addExpense({
      id: `custom-${Date.now()}`,
      title: customForm.title.trim(),
      amount,
      category: customForm.category
    });
    setCustomForm({ title: "", amount: "", category: "Food" });
    setShowCustom(false);
  };

  const visiblePresets = useMemo(() => {
    let list = ALL_QUICK_PRESETS;

    if (activeTab === "recent") {
      const recentPresets = recentIds
        .map((id) => ALL_QUICK_PRESETS.find((p) => p.id === id))
        .filter(Boolean);
      list = recentPresets;
    } else if (activeTab !== "all") {
      const group = QUICK_ADD_GROUPS.find((g) => g.id === activeTab);
      list = group ? group.presets : [];
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.label.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          String(p.amount).includes(q)
      );
    }

    return list;
  }, [activeTab, recentIds, search]);

  return (
    <div className="quick-add">
      <div className="quick-add-header">
        <div>
          <span className="quick-add-title">⚡ Quick Add</span>
          <span className="quick-add-hint">
            {ALL_QUICK_PRESETS.length} presets · tap to log instantly
          </span>
        </div>
        <div className="quick-add-actions">
          <motion.button
            type="button"
            className="quick-action-btn"
            onClick={handleRepeatLast}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Repeat last expense"
          >
            <FaRedo />
            <span>Repeat last</span>
          </motion.button>
          <motion.button
            type="button"
            className={`quick-action-btn ${showCustom ? "active" : ""}`}
            onClick={() => setShowCustom((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus />
            <span>Custom</span>
          </motion.button>
        </div>
      </div>

      <input
        type="text"
        className="quick-add-search"
        placeholder="Search presets... (e.g. coffee, rent, gym)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="quick-add-tabs">
        {QUICK_ADD_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`quick-add-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.id === "recent" && recentIds.length > 0 && (
              <span className="quick-tab-count">{recentIds.length}</span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showCustom && (
          <motion.form
            className="quick-custom-form"
            onSubmit={handleCustomSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <input
              type="text"
              placeholder="Title"
              value={customForm.title}
              onChange={(e) => setCustomForm((f) => ({ ...f, title: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Amount"
              min="0"
              step="0.01"
              value={customForm.amount}
              onChange={(e) => setCustomForm((f) => ({ ...f, amount: e.target.value }))}
            />
            <select
              value={customForm.category}
              onChange={(e) => setCustomForm((f) => ({ ...f, category: e.target.value }))}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn primary quick-custom-submit">
              Add
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="quick-add-chips">
        {visiblePresets.length === 0 ? (
          <p className="quick-add-empty">
            {activeTab === "recent"
              ? "Your recently used presets will appear here."
              : "No presets match your search."}
          </p>
        ) : (
          visiblePresets.map((preset) => (
            <motion.button
              key={preset.id}
              type="button"
              className="quick-add-chip"
              onClick={() => addExpense(preset)}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {preset.label}
              <span className="quick-add-amount">₹{preset.amount.toLocaleString("en-IN")}</span>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
};

export default QuickAdd;
