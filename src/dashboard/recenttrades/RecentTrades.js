import React from "react";
import "./RecentTrades.css";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const RecentTrades = () => {
  const journalData = useSelector((state) => state.journalData);

  if (!journalData || journalData.length === 0) {
    return <div className="recent-trades-container">No recent trades.</div>;
  }

  return (
    <div className="recent-trades-container">
      <div className="calendar-header">Recent Trades</div>
      <motion.div
        className="recent-trades-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {journalData
          .slice()
          .reverse()
          .map((trade, index) => {
            const pnlClass = trade.pnl >= 0 ? "pnl-profit" : "pnl-loss";
            const formattedPNL =
              trade.pnl >= 0
                ? `+$${trade.pnl.toFixed(2)}`
                : `-$${Math.abs(trade.pnl.toFixed(2))}`;

            return (
              <motion.div
                key={index}
                className={`recent-trade-cell ${pnlClass}`}
                variants={itemVariants}
              >
                <div className="trade-asset">
                  <div className="trade-pnl">{formattedPNL}</div>
                  {trade.asset}
                  <div className="trade-date">
                    {new Date(trade.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </motion.div>
    </div>
  );
};

export default RecentTrades;
