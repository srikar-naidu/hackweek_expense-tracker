export const format = {
  monthShort: (key) => {
    const [year, month] = key.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString("en-IN", {
      month: "short",
      year: "2-digit"
    });
  }
};

export const STORAGE_VERSION = "3.0";

export const clearAppStorage = () => {
  ["expenses", "monthly-budget", "quick-add-recent", "app-storage-version"].forEach((key) => {
    window.localStorage.removeItem(key);
  });
};

