import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-text">
          © {year} Expense Tracker. All rights reserved.
        </span>
        <span className="footer-text subtle">
          Designed as a premium glassmorphism SaaS dashboard.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

