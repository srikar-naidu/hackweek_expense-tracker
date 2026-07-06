export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);
};

export const formatISODate = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().slice(0, 10);
};

export const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export const getCategoryMeta = (category) => {
  const mapping = {
    Food: { icon: "🍔", bg: "linear-gradient(135deg,#fb7185,#f97316)" },
    Transport: { icon: "🚗", bg: "linear-gradient(135deg,#38bdf8,#0ea5e9)" },
    Shopping: { icon: "🛍", bg: "linear-gradient(135deg,#a855f7,#ec4899)" },
    Entertainment: { icon: "🎮", bg: "linear-gradient(135deg,#22c55e,#16a34a)" },
    Education: { icon: "📚", bg: "linear-gradient(135deg,#6366f1,#22d3ee)" },
    Health: { icon: "❤️", bg: "linear-gradient(135deg,#f97316,#f43f5e)" },
    Bills: { icon: "💡", bg: "linear-gradient(135deg,#facc15,#f97316)" },
    Salary: { icon: "💰", bg: "linear-gradient(135deg,#22c55e,#4ade80)" },
    Other: { icon: "📦", bg: "linear-gradient(135deg,#9ca3af,#6b7280)" }
  };
  return mapping[category] || mapping.Other;
};

export const createExpense = (existing, payload) => {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  const now = new Date().toISOString();
  const expense = {
    id,
    title: payload.title,
    amount: payload.amount,
    category: payload.category,
    date: payload.date,
    createdAt: now
  };
  return [expense, ...existing];
};

export const updateExpense = (existing, id, updated) =>
  existing.map((e) => (e.id === id ? { ...e, ...updated } : e));

export const deleteExpenseById = (existing, id) =>
  existing.filter((e) => e.id !== id);

