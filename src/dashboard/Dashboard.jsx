import React from "react";
import { FaArrowDown, FaArrowUp, FaMoneyBillWave, FaReceipt } from "react-icons/fa";
import SummaryCard from "./SummaryCard.jsx";
import SmartInsights from "./SmartInsights.jsx";
import { formatCurrency } from "../utils/helpers.js";
import { getCategoryMeta } from "../utils/helpers.js";

const Dashboard = ({ expenses, budget, spent, remaining, percentage, monthlySummary }) => {
  const transactions = expenses.length;
  const accentOrange = "linear-gradient(135deg, #f97316, #ea580c)";
  const accentAmber = "linear-gradient(135deg, #fbbf24, #f97316)";
  const accentEmber = "linear-gradient(135deg, #fb923c, #c2410c)";
  const accentGold = "linear-gradient(135deg, #fcd34d, #f59e0b)";

  const remainingLabel =
    budget > 0
      ? `${percentage.toFixed(0)}% of budget ${percentage > 100 ? "used" : "used so far"}`
      : "Set a budget to get started";

  const topCategoryMeta = monthlySummary.highestCategory
    ? getCategoryMeta(monthlySummary.highestCategory)
    : null;

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Overview</h1>
          <p className="dashboard-subtitle">
            Your financial pulse — live, local, and always in sync.
          </p>
        </div>
        <div className="dashboard-pill">
          <span className="dot-live" /> Live sync
        </div>
      </div>

      <div className="summary-grid">
        <SummaryCard
          title="Total Expenses"
          icon={<FaArrowDown />}
          value={monthlySummary.totalExpenses}
          isCurrency
          subtitle="This month"
          accent={accentOrange}
        />
        <SummaryCard
          title="Monthly Budget"
          icon={<FaMoneyBillWave />}
          value={budget > 0 ? budget : "Not set"}
          isCurrency={budget > 0}
          subtitle={budget > 0 ? "Tap to adjust below" : "Set your ideal monthly limit"}
          accent={accentAmber}
        />
        <SummaryCard
          title="Remaining Budget"
          icon={<FaArrowUp />}
          value={budget > 0 ? remaining : "—"}
          isCurrency={budget > 0}
          subtitle={remainingLabel}
          accent={accentEmber}
        />
        <SummaryCard
          title="Transactions"
          icon={<FaReceipt />}
          value={transactions}
          isNumeric
          subtitle={`Avg. ${formatCurrency(monthlySummary.averageExpense)} per expense`}
          accent={accentGold}
        />
      </div>

      <div className="dashboard-extras">
        <SmartInsights
          expenses={expenses}
          budget={budget}
          spent={spent}
          percentage={percentage}
          monthlySummary={monthlySummary}
        />

        <div className="monthly-summary-panel glass-card card-3d">
          <h3 className="monthly-summary-title">Monthly Summary</h3>
          <div className="monthly-summary-grid">
            <div className="monthly-stat">
              <span className="monthly-stat-label">Total Spent</span>
              <span className="monthly-stat-value">{formatCurrency(monthlySummary.totalExpenses)}</span>
            </div>
            <div className="monthly-stat">
              <span className="monthly-stat-label">Top Category</span>
              <span className="monthly-stat-value">
                {topCategoryMeta
                  ? `${topCategoryMeta.icon} ${monthlySummary.highestCategory}`
                  : "—"}
              </span>
            </div>
            <div className="monthly-stat">
              <span className="monthly-stat-label">Transactions</span>
              <span className="monthly-stat-value">{monthlySummary.transactions}</span>
            </div>
            <div className="monthly-stat">
              <span className="monthly-stat-label">Average</span>
              <span className="monthly-stat-value">{formatCurrency(monthlySummary.averageExpense)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
