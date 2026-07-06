import React from "react";
import { FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <header className="navbar-wrapper">
      <motion.nav
        className="navbar glass-card"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="navbar-left">
          <div className="navbar-logo">
            <div className="navbar-icon">
              <FaWallet />
            </div>
            <div>
              <div className="navbar-title">Expense Tracker</div>
              <div className="navbar-tagline">Own your spending, effortlessly.</div>
            </div>
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-status">
            <span className="navbar-status-dot" />
            <span>Pro Dashboard</span>
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
