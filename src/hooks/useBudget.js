import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

export const useBudget = (expenses) => {
  const [budget, setBudget, clearBudget] = useLocalStorage("monthly-budget", 0);

  const spent = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
    [expenses]
  );

  const remaining = useMemo(() => Math.max(budget - spent, 0), [budget, spent]);

  const percentage = useMemo(
    () => (budget > 0 ? (spent / budget) * 100 : 0),
    [budget, spent]
  );

  return { budget, setBudget, clearBudget, spent, remaining, percentage };
};
