import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useMotionValue, animate } from "framer-motion";
import "./RecentTrades.css";

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

const AnimatedNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 3,
      onUpdate: (v) => setDisplayValue(v.toFixed(2)),
    });

    return () => controls.stop();
  }, [value, motionValue]);

  return (
    <span>
      {value >= 0 ? `+$${displayValue}` : `-$${Math.abs(displayValue)}`}
    </span>
  );
};

const RecentTrades = () => {
  const dispatch = useDispatch();
  const journalData = useSelector((state) => state.journalData);

  // console.log(journalData[0]);
  // console.log(journalData[journalData.length - 1]);

  // if (!journalData || journalData.length === 0) {
  //   return <div className="recent-trades-container">No recent trades.</div>;
  // }

  const handleAddTrade = () => {
    dispatch({ type: "TOGGLE_JOURNAL_MODAL", payload: true });
  };

  return (
    <div className="recent-trades-container">
      <div className="calendar-header-one">Recent Trades</div>
      <motion.div
        className="recent-trades-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {journalData
          .slice()
          .reverse()
          .slice(0, 10)
          .map((trade, index) => {
            const pnlClass = trade.pnl >= 0 ? "pnl-profit" : "pnl-loss";

            return (
              <motion.div
                key={index}
                className={`recent-trade-cell ${pnlClass}`}
                variants={itemVariants}
              >
                <div className="trade-asset">
                  <div className="trade-pnl">
                    <AnimatedNumber value={trade.pnl} />
                  </div>
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
      {journalData && journalData.length > 0 && (
        <div onClick={handleAddTrade} className="add-btn">
          ADD Trade
        </div>
      )}
    </div>
  );
};

export default RecentTrades;
