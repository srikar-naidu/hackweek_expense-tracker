import { format } from "./constants.js";

export const prepareCategoryPieData = (expenses, categories) => {
  if (!expenses.length) return [];
  const map = new Map();

  expenses.forEach((e) => {
    const key = e.category || "Other";
    map.set(key, (map.get(key) || 0) + Number(e.amount || 0));
  });

  return categories
    .filter((cat) => map.has(cat.name))
    .map((cat) => ({
      name: `${cat.icon} ${cat.name}`,
      value: map.get(cat.name)
    }));
};

export const prepareMonthlyBarData = (expenses) => {
  if (!expenses.length) return [];
  const byMonth = new Map();

  expenses.forEach((e) => {
    const d = new Date(e.date || e.createdAt);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    byMonth.set(monthKey, (byMonth.get(monthKey) || 0) + Number(e.amount || 0));
  });

  const sorted = Array.from(byMonth.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return sorted.map(([key, total]) => ({
    month: format.monthShort(key),
    total
  }));
};

