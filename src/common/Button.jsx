import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, variant = "primary", ...rest }) => {
  const className = ["btn", variant].join(" ");
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;

