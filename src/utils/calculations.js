export const searchExpenses = (expenses, term) => {
  if (!term.trim()) return expenses;
  const lower = term.toLowerCase();
  return expenses.filter((e) => {
    const title = e.title?.toLowerCase() || "";
    const category = e.category?.toLowerCase() || "";
    const amount = String(e.amount || "").toLowerCase();
    return (
      title.includes(lower) || category.includes(lower) || amount.includes(lower)
    );
  });
};

export const filterExpenses = (expenses, category) => {
  if (!category || category === "All") return expenses;
  return expenses.filter((e) => e.category === category);
};

export const sortExpenses = (expenses, sortOption) => {
  const sorted = [...expenses];
  switch (sortOption) {
    case "latest":
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    case "highest":
      return sorted.sort((a, b) => b.amount - a.amount);
    case "lowest":
      return sorted.sort((a, b) => a.amount - b.amount);
    default:
      return sorted;
  }
};

export const getMonthlySummary = (expenses) => {
  if (expenses.length === 0) {
    return {
      totalExpenses: 0,
      highestCategory: null,
      transactions: 0,
      averageExpense: 0
    };
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const transactions = expenses.length;
  const averageExpense = totalExpenses / transactions;

  const byCategory = expenses.reduce((acc, e) => {
    const key = e.category || "Other";
    acc[key] = (acc[key] || 0) + Number(e.amount || 0);
    return acc;
  }, {});

  let highestCategory = null;
  let max = 0;
  Object.entries(byCategory).forEach(([cat, value]) => {
    if (value > max) {
      max = value;
      highestCategory = cat;
    }
  });

  return {
    totalExpenses,
    highestCategory,
    transactions,
    averageExpense
  };
};

export const getSmartInsights = (expenses, budget, spent, percentage, monthlySummary) => {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysRemaining = Math.max(daysInMonth - dayOfMonth, 0);

  const dailyBurn = dayOfMonth > 0 ? spent / dayOfMonth : 0;
  const projectedSpend = dailyBurn * daysInMonth;
  const expectedUsage = (dayOfMonth / daysInMonth) * 100;

  let healthScore = 85;
  if (budget > 0) {
    const paceDiff = percentage - expectedUsage;
    healthScore = Math.round(
      Math.max(0, Math.min(100, 100 - Math.abs(paceDiff) * 1.2 - (percentage > 100 ? 25 : 0)))
    );
  } else if (expenses.length === 0) {
    healthScore = 50;
  }

  let runwayLabel = "Set a budget";
  if (budget > 0 && dailyBurn > 0) {
    const daysLeft = Math.floor((budget - spent) / dailyBurn);
    runwayLabel = daysLeft > 0 ? `${daysLeft} days left` : "Budget exceeded";
  } else if (budget > 0 && spent === 0) {
    runwayLabel = `${daysInMonth} days left`;
  }

  let message = "Add your first expense to unlock personalized insights.";
  if (expenses.length > 0 && budget <= 0) {
    message = `You've logged ${monthlySummary.transactions} transaction${monthlySummary.transactions !== 1 ? "s" : ""}. Set a monthly budget to track your runway.`;
  } else if (budget > 0 && percentage > 100) {
    message = `You've exceeded your budget by ${(percentage - 100).toFixed(0)}%. Consider pausing non-essential spending.`;
  } else if (budget > 0 && percentage > expectedUsage + 15) {
    message = `Spending ${percentage.toFixed(0)}% of budget with ${daysRemaining} days left. You're burning faster than planned.`;
  } else if (budget > 0 && percentage < expectedUsage - 10) {
    message = `Great discipline! You're ${(expectedUsage - percentage).toFixed(0)}% under your expected pace this month.`;
  } else if (monthlySummary.highestCategory) {
    message = `${monthlySummary.highestCategory} is your top category. Projected month-end spend: ₹${Math.round(projectedSpend).toLocaleString("en-IN")}.`;
  }

  return {
    healthScore,
    dailyBurn,
    projectedSpend,
    daysRemaining,
    runwayLabel,
    message
  };
};

