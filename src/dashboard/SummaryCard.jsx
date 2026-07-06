import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import AnimatedCounter from "../common/AnimatedCounter.jsx";

const SummaryCard = ({ title, icon, value, subtitle, accent, isCurrency = false, isNumeric = false }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const renderValue = () => {
    if (isNumeric && typeof value === "number") {
      return <AnimatedCounter value={value} format={(v) => String(Math.round(v))} className="summary-card-value" />;
    }
    if (isCurrency && typeof value === "number") {
      return (
        <AnimatedCounter
          value={value}
          format={(v) =>
            new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(v)
          }
          className="summary-card-value"
        />
      );
    }
    return <div className="summary-card-value">{value}</div>;
  };

  return (
    <motion.div
      ref={ref}
      className="summary-card glass-card card-3d"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <div className="card-3d-shine" />
      <div className="summary-card-border" style={{ background: accent }} />
      <div className="summary-card-inner">
        <div className="summary-card-header">
          <div className="summary-card-title">{title}</div>
          <div className="summary-card-icon" style={{ background: accent }}>
            {icon}
          </div>
        </div>
        {renderValue()}
        {subtitle && <div className="summary-card-subtitle">{subtitle}</div>}
      </div>
    </motion.div>
  );
};

export default SummaryCard;
