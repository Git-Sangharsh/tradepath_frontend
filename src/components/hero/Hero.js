import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import HeroBg from "../../assets/hero_bg.mp4";

const Hero = () => {
  return (
    <div className="hero-container">
      <video className="hero-bg" autoPlay loop muted playsInline>
        <source src={HeroBg} type="video/mp4" />
      </video>

      <motion.div
        className="hero-wrapper flex-center"
        initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="hero-header-wrapper flex-center"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="hero-header font-var">
            YOUR <span className="hero-header-span">AI-POWERED</span> PATH TO{" "}
            <span className="hero-header-span">PROFITABLE</span> TRADING
          </h1>
        </motion.div>

        <motion.p
          className="hero-p"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Stop guessing. Start winning — TradePath AI analyzes your trading
          and habits to maximize success and profitability.
        </motion.p>

        <motion.div
          className="here-wrapper-btn font-var"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Get Started Now
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
