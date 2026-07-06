import React, { useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./layout/Navbar.jsx";
import Footer from "./layout/Footer.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import BudgetProgress from "./dashboard/BudgetProgress.jsx";
import ExpenseForm from "./expense/ExpenseForm.jsx";
import QuickAdd from "./expense/QuickAdd.jsx";
import ExpenseList from "./expense/ExpenseList.jsx";
import SearchBar from "./expense/SearchBar.jsx";
import Filter from "./expense/Filter.jsx";
import Sort from "./expense/Sort.jsx";
import PieChartComponent from "./charts/PieChartComponent.jsx";
import BarChartComponent from "./charts/BarChartComponent.jsx";
import EmptyState from "./common/EmptyState.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useBudget } from "./hooks/useBudget.js";
import {
  filterExpenses,
  searchExpenses,
  sortExpenses,
  getMonthlySummary
} from "./utils/calculations.js";
import { prepareCategoryPieData, prepareMonthlyBarData } from "./utils/chartData.js";
import { formatCurrency } from "./utils/helpers.js";
import { categories } from "./data/categories.js";
import "./styles/Navbar.css";
import "./styles/Dashboard.css";
import "./styles/Expense.css";
import "./styles/Charts.css";

const App = () => {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const { budget, setBudget, clearBudget, spent, remaining, percentage } = useBudget(expenses);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOption, setSortOption] = useState("latest");
  const [editingExpense, setEditingExpense] = useState(null);

  const processedExpenses = useMemo(() => {
    let result = [...expenses];
    result = searchExpenses(result, searchTerm);
    result = filterExpenses(result, filterCategory);
    result = sortExpenses(result, sortOption);
    return result;
  }, [expenses, searchTerm, filterCategory, sortOption]);

  const monthlySummary = useMemo(
    () => getMonthlySummary(expenses),
    [expenses]
  );

  const pieData = useMemo(
    () => prepareCategoryPieData(expenses, categories),
    [expenses]
  );
  const barData = useMemo(() => prepareMonthlyBarData(expenses), [expenses]);

  const handleClearTransactions = () => {
    if (expenses.length === 0) {
      toast("No transactions to clear yet.");
      return;
    }

    setExpenses([]);
    toast.success("All transactions cleared.");
  };

  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <section className="app-content">
          <Dashboard
            expenses={expenses}
            budget={budget}
            spent={spent}
            remaining={remaining}
            percentage={percentage}
            monthlySummary={monthlySummary}
          />

          <BudgetProgress
            budget={budget}
            setBudget={setBudget}
            clearBudget={clearBudget}
            spent={spent}
            remaining={remaining}
            percentage={percentage}
          />

          <section className="content-grid">
            <motion.section
              className="left-column"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <QuickAdd expenses={expenses} setExpenses={setExpenses} />

              <ExpenseForm
                categories={categories}
                expenses={expenses}
                setExpenses={setExpenses}
                editingExpense={editingExpense}
                setEditingExpense={setEditingExpense}
                budget={budget}
                spent={spent}
              />

              <div className="charts-wrapper">
                <PieChartComponent data={pieData} />
                <BarChartComponent data={barData} />
              </div>
            </motion.section>

            <motion.section
              className="right-column"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="helper-panel glass-card">
                <div className="helper-panel-header">
                  <div>
                    <h3 className="helper-panel-title">Helpful shortcuts</h3>
                    <p className="helper-panel-subtitle">Keep the month tidy and your budget in view.</p>
                  </div>
                  <span className="helper-panel-pill">This month</span>
                </div>

                <div className="helper-actions">
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={handleClearTransactions}
                    disabled={expenses.length === 0}
                  >
                    Clear transactions
                  </button>
                </div>

                <div className="helper-summary-grid">
                  <div className="helper-summary-card">
                    <span className="helper-summary-label">Spent</span>
                    <span className="helper-summary-value">{formatCurrency(monthlySummary.totalExpenses)}</span>
                  </div>
                  <div className="helper-summary-card">
                    <span className="helper-summary-label">Transactions</span>
                    <span className="helper-summary-value">{monthlySummary.transactions}</span>
                  </div>
                  <div className="helper-summary-card">
                    <span className="helper-summary-label">Average</span>
                    <span className="helper-summary-value">{formatCurrency(monthlySummary.averageExpense)}</span>
                  </div>
                  <div className="helper-summary-card">
                    <span className="helper-summary-label">Top category</span>
                    <span className="helper-summary-value">{monthlySummary.highestCategory || "—"}</span>
                  </div>
                </div>
              </div>

              <div className="list-header">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <div className="list-header-controls">
                  <Filter
                    value={filterCategory}
                    onChange={setFilterCategory}
                    categories={categories}
                  />
                  <Sort value={sortOption} onChange={setSortOption} />
                </div>
              </div>

              <AnimatePresence mode="popLayout">
                {processedExpenses.length === 0 ? (
                  <EmptyState hasExpenses={expenses.length > 0} />
                ) : (
                  <ExpenseList
                    expenses={processedExpenses}
                    setExpenses={setExpenses}
                    setEditingExpense={setEditingExpense}
                    categories={categories}
                  />
                )}
              </AnimatePresence>
            </motion.section>
          </section>
        </section>
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1c1917",
            color: "#fafaf9",
            border: "1px solid rgba(251, 146, 60, 0.3)"
          },
          success: { iconTheme: { primary: "#f97316", secondary: "#fafaf9" } }
        }}
      />
    </div>
  );
};

export default App;

