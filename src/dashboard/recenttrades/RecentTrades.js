import React from "react";
import "./RecentTrades.css";
import { useSelector } from "react-redux";

const RecentTrades = () => {
  const journalData = useSelector((state) => state.journalData);

  return (
    <div className="recent-trades-container">
      <div className="calendar-header">Recent Trades</div>
      <div className="recent-trades-grid">
        {journalData
          .slice()
          .reverse()
          .map((trade, index) => {
            const pnlClass = trade.pnl >= 0 ? "pnl-profit" : "pnl-loss";
            const formattedPNL =
              trade.pnl >= 0
                ? `+$${trade.pnl.toFixed(2)}`
                : `-$${Math.abs(trade.pnl).toFixed(2)}`;

            return (
              <div key={index} className={`recent-trade-cell ${pnlClass}`}>
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecentTrades;
