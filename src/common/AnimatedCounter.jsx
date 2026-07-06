import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const AnimatedCounter = ({ value, format = (v) => v, className = "" }) => {
  const numeric = typeof value === "number" ? value : parseFloat(String(value).replace(/[^\d.-]/g, "")) || 0;
  const spring = useSpring(0, { stiffness: 90, damping: 18 });
  const display = useTransform(spring, (v) => format(Math.round(v * 100) / 100));
  const [text, setText] = useState(format(0));

  useEffect(() => {
    spring.set(numeric);
  }, [numeric, spring]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [display]);

  return (
    <motion.span className={className} layout>
      {text}
    </motion.span>
  );
};

export default AnimatedCounter;
