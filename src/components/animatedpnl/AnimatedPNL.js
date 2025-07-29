import React from "react";
import { useSelector } from "react-redux";
import useAnimatedNumber from "../../hooks/useAnimatedNumber";
const AnimatedPNL = () => {
  const journalData = useSelector((state) => state.journalData || []);
  const today = new Date().toDateString();

  const todayTrade = journalData.find((entry) => {
    const entryDate = new Date(entry.date).toDateString();
    return entryDate === today;
  });

  const pnl = todayTrade?.pnl || 0;
  const animatedPNL = useAnimatedNumber(pnl);

  if (!todayTrade) return null;

  const formatted =
    pnl >= 0
      ? `+$${animatedPNL.toFixed(2)}`
      : `-$${Math.abs(animatedPNL).toFixed(2)}`;

  return <div className="animated-pnl">{formatted}</div>;
};

export default AnimatedPNL;
