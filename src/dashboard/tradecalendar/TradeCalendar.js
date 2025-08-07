import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import "./TradeCalendar.css";
import RecentTrades from "../recenttrades/RecentTrades";
import { motion } from "framer-motion";
import { useMotionValue, animate, useTransform } from "framer-motion";

const AnimatedPNL = ({ target }) => {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) => {
    return target >= 0
      ? `$${latest.toFixed(2)}`
      : `-$${Math.abs(latest).toFixed(2)}`;
  });

  useEffect(() => {
    const controls = animate(motionVal, target, {
      duration: 3,
      ease: "easeOut",
    });
    return controls.stop;
  }, [target, motionVal]);

  return <motion.span>{rounded}</motion.span>;
};

const TradeCalendar = () => {
  const journalData = useSelector((state) => state.journalData || []);

  const [animatedTradeMap, setAnimatedTradeMap] = useState({});

  const today = new Date();
  const [monthOffSet, setMonthOffSet] = useState(0);
  const viewDate = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffSet
  );

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Build trade map from journal data using useMemo to prevent unnecessary re-renders
  const tradeMap = useMemo(() => {
    const map = {};
    journalData.forEach((trade) => {
      const tradeDate = new Date(trade.date);
      if (
        tradeDate.getMonth() === currentMonth &&
        tradeDate.getFullYear() === currentYear
      ) {
        const day = tradeDate.getDate();
        if (!map[day]) {
          map[day] = { pnl: 0, wins: 0, losses: 0, breakevens: 0 };
        }

        map[day].pnl += trade.pnl;

        if (trade.result === "win") map[day].wins += 1;
        else if (trade.result === "lose") map[day].losses += 1;
        else map[day].breakevens += 1;
      }
    });
    return map;
  }, [journalData, currentMonth, currentYear]);

  // Animate trade data changes
  useEffect(() => {
    setAnimatedTradeMap({}); // Clear before animation begins
    if (Object.keys(tradeMap).length > 0) {
      const days = Object.keys(tradeMap).sort(
        (a, b) => parseInt(a) - parseInt(b)
      );
      days.forEach((day, index) => {
        setTimeout(() => {
          setAnimatedTradeMap((prev) => ({
            ...prev,
            [day]: tradeMap[day],
          }));
        }, index * 50);
      });
    }
  }, [tradeMap]);

  const renderCells = () => {
    const cells = [];

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const trade = animatedTradeMap[day]; // Use animated trade map
      const isWin = trade?.wins > trade?.losses;
      const isLoss = trade?.losses > trade?.wins;

      const cellClass = trade
        ? isWin
          ? "win"
          : isLoss
          ? "loss"
          : "neutral"
        : "";

      // Define color variants for smooth transitions based on your CSS
      const colorVariants = {
        default: {
          background: "transparent",
          borderColor: "rgba(255, 255, 255, 0.06)",
          color: "#4affc1cc",
          boxShadow: "inset 0 0 4px rgba(0, 255, 159, 0.05)",
        },
        win: {
          background: "linear-gradient(145deg, #0b2918, #000)",
          borderColor: "#00ff9991",
          color: "#00ff99",
          boxShadow:
            "0 0 12px rgba(0, 255, 153, 0.4), inset 0 0 6px rgba(0, 255, 153, 0.3)",
        },
        loss: {
          background: "linear-gradient(145deg, #260000, #000)",
          borderColor: "#ff4d5069",
          color: "#ff4d4f",
          boxShadow:
            "0 0 12px rgba(255, 77, 79, 0.4), inset 0 0 6px rgba(255, 77, 79, 0.3)",
        },
        neutral: {
          background: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.06)",
          color: "#4affc155",
          boxShadow: "inset 0 0 4px rgba(0, 255, 159, 0.05)",
        },
      };

      cells.push(
        <motion.div
          key={day}
          className={`calendar-cell ${cellClass}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            ...colorVariants[cellClass || "default"],
          }}
          transition={{
            duration: 0.3,
            delay: day * 0.01,
            // Separate transition for color changes
            background: { duration: 0.5, ease: "easeInOut" },
            borderColor: { duration: 0.5, ease: "easeInOut" },
            color: { duration: 0.5, ease: "easeInOut" },
            boxShadow: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <div className="day-number">{day}</div>
          {trade && (
            <motion.div
              className="pnl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <AnimatedPNL target={trade.pnl} />
            </motion.div>
          )}
        </motion.div>
      );
    }

    return cells;
  };

  const handlePreviousMonth = () => {
    setMonthOffSet((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setMonthOffSet((prev) => prev + 1);
  };

  return (
    <div className="calendar-container font-var">
      <div className="calendar-wrapper">
        <div className="calendar-header">
          <button onClick={handlePreviousMonth}>previous Month</button>
          {/* {today.toLocaleString("default", { month: "long" })} {currentYear} */}
          {viewDate.toLocaleString("default", { month: "long" })}{" "}
          {viewDate.getFullYear()}
          <button onClick={handleNextMonth}>Next Month</button>
        </div>
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="calendar-day-label font-var">
              {d}
            </div>
          ))}
          {renderCells()}
        </div>
      </div>
      <div className="calendar-wrapper-2">
        <RecentTrades />
      </div>
    </div>
  );
};

export default TradeCalendar;
