import React from "react";
import { motion } from "framer-motion";
import "./Navbar.css";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -40, x: "-50%", filter: "blur(20px)" }}
      animate={{ opacity: 1, y: 0, x: "-50%", filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="navbar"
    >
      {/* Left - Logo */}
      <div className="navbar-logo">
        <span className="logo-icon">📈</span>
        <span className="logo-text">TRADEPATH</span>
      </div>

      {/* Center - Menu */}
      <ul className="navbar-menu">
        <li className="active">Home</li>
        <li>Features</li>
        <li>How it works</li>
        <li>Pricing</li>
        <li>Contact Us</li>
      </ul>

      {/* Right - Actions */}
      <div className="navbar-actions">
        <button className="cta-btn">Get Started Now</button>
        <span className="login">
          {/* <span className="login-icon">👤</span> Log In */}
        </span>
      </div>
    </motion.nav>
  );
};

export default Navbar;
