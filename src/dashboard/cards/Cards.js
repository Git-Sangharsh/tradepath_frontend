import React, { useEffect, useState } from 'react';
import './Cards.css';
import { useSelector } from 'react-redux';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Cards = () => {
  const journalData = useSelector((state) => state.journalData);

  const totalTrades = journalData.length;
  const totalWins = journalData.filter((trade) => trade.result === 'win').length;
  const winPercentage = totalTrades > 0 ? ((totalWins / totalTrades) * 100).toFixed(0) : 0;
  const totalPnL = journalData.reduce((acc, trade) => acc + (trade.pnl || 0), 0);
  const maxProfit = Math.max(...journalData.map(trade => trade.pnl || 0), 0);
  const maxDrawdown = Math.min(...journalData.map(trade => trade.pnl || 0), 0);

  const [animated, setAnimated] = useState({
    winPercentage: 0,
    totalPnL: 0,
    maxProfit: 0,
    maxDrawdown: 0,
  });

useEffect(() => {
  const animateValue = (key, endValue) => {
    const duration = 3000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * endValue);

      setAnimated((prev) => ({ ...prev, [key]: current }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  animateValue('winPercentage', parseInt(winPercentage));
  animateValue('totalPnL', totalPnL);
  animateValue('maxProfit', maxProfit);
  animateValue('maxDrawdown', Math.abs(maxDrawdown));
}, [winPercentage, totalPnL, maxProfit, maxDrawdown]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="cards-container font-var"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="cards-wrapper">
        {/* Win % */}
        <motion.div className="card-box" variants={cardVariants}>
          <div className="card-header font-var">
            <span>Trade win %</span>
            <Info size={16} />
          </div>
          <div className="card-value font-var">{animated.winPercentage}%</div>
        </motion.div>

        {/* Total PnL */}
        <motion.div className="card-box" variants={cardVariants}>
          <div className="card-header font-var">
            <span>Total PnL</span>
            <Info size={16} />
          </div>
          <div className="card-value font-var">${animated.totalPnL}</div>
        </motion.div>

        {/* Max Profit */}
        <motion.div className="card-box" variants={cardVariants}>
          <div className="card-header font-var">
            <span>Max Profit</span>
            <Info size={16} />
          </div>
          <div className="card-value font-var">${animated.maxProfit}</div>
        </motion.div>

        {/* Max Drawdown */}
        <motion.div className="card-box" variants={cardVariants}>
          <div className="card-header font-var">
            <span>Max Drawdown</span>
            <Info size={16} />
          </div>
          <div className="card-value font-var max-drawdown">-${animated.maxDrawdown}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cards;
