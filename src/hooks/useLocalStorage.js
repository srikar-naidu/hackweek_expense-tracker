import { useEffect, useRef, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });
  const skipWriteRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (skipWriteRef.current) {
        skipWriteRef.current = false;
        return;
      }

      if (value === undefined || value === null) {
        window.localStorage.removeItem(key);
        return;
      }

      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  }, [key, value]);

  const removeValue = () => {
    skipWriteRef.current = true;
    setValue(defaultValue);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // ignore removal errors
      }
    }
  };

  return [value, setValue, removeValue];
};

