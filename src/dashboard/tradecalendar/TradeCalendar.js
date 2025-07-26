// src/components/TradeCalendar.jsx
import React from "react";
import { useSelector } from "react-redux";
import "./TradeCalendar.css";
import RecentTrades from "../recenttrades/RecentTrades";

const TradeCalendar = () => {
  const journalData = useSelector((state) => state.journalData || []);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  // Convert to [dayNumber]: { pnl, result }
  // Convert to { [dayNumber]: { pnl: totalPnl, result: "win" | "lose" | "break-even" } }
  const tradeMap = {};

  journalData.forEach((trade) => {
    const tradeDate = new Date(trade.date);
    if (
      tradeDate.getMonth() === currentMonth &&
      tradeDate.getFullYear() === currentYear
    ) {
      const day = tradeDate.getDate();
      if (!tradeMap[day]) {
        tradeMap[day] = { pnl: 0, wins: 0, losses: 0, breakevens: 0 };
      }

      tradeMap[day].pnl += trade.pnl;

      if (trade.result === "win") tradeMap[day].wins += 1;
      else if (trade.result === "lose") tradeMap[day].losses += 1;
      else tradeMap[day].breakevens += 1;
    }
  });

  const renderCells = () => {
    const cells = [];

    // Empty cells before month starts
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const trade = tradeMap[day];
      const isWin = trade?.wins > trade?.losses;
      const isLoss = trade?.losses > trade?.wins;

      const cellClass = trade
        ? isWin
          ? "win"
          : isLoss
          ? "loss"
          : "neutral"
        : "";

      cells.push(
        <div key={day} className={`calendar-cell ${cellClass}`}>
          <div className="day-number">{day}</div>
          {trade && (
            <div className="pnl">
              {trade.pnl >= 0
                ? `$${trade.pnl.toFixed(2)}`
                : `-$${Math.abs(trade.pnl).toFixed(2)}`}
            </div>
          )}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="calendar-container font-var">
      <div className="calendar-wrapper ">
        <div className="calendar-header">
          {today.toLocaleString("default", { month: "long" })} {currentYear}
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
      <RecentTrades />
    </div>
  );
};

export default TradeCalendar;
