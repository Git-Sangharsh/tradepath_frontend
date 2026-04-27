import "./Sidebar.css";
import dashboardSvg from "../../assets/dashboard.svg";
import aiSvg from "../../assets/ai.svg";
import historySvg from "../../assets/history.svg";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const Sidebar = () => {
  const dispatch = useDispatch();

  const setTradeCalendar = () => {
    dispatch({ type: "SET_ACTIVE_COMPONENT", payload: "tradeCalendarComponent" });
  };

  const setAnalyse = () => {
    dispatch({ type: "SET_ACTIVE_COMPONENT", payload: "analyseComponent" });
  };

  const setTable = () => {
    dispatch({ type: "SET_ACTIVE_COMPONENT", payload: "tableComponent" });
  };

  // Parent container variant for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // delay between each icon
      },
    },
  };

  // Individual icon animation
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <motion.div
      className="sidebar"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.img
        className="sidebar-items"
        src={dashboardSvg}
        alt=""
        onClick={setTradeCalendar}
        variants={iconVariants}
        whileHover={{ scale: 1.1 }}
      />
      <motion.img
        className="sidebar-items"
        src={aiSvg}
        alt=""
        onClick={setAnalyse}
        variants={iconVariants}
        whileHover={{ scale: 1.1 }}
      />
      <motion.img
        className="sidebar-items"
        src={historySvg}
        alt=""
        onClick={setTable}
        variants={iconVariants}
        whileHover={{ scale: 1.1 }}
      />
    </motion.div>
  );
};

export default Sidebar;
