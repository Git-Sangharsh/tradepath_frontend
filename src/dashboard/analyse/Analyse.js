import React from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import "./Analyse.css"; // custom styling

const Analyse = () => {
  const analyseData = useSelector((state) => state.analyseData);

  return (
    <div className="analyse-container">
      <div className="analyse-wrapper">
        <h2 className="analyse-heading font-var">📊 TradePath AI Analysis</h2>
        {analyseData ? (
          <div className="analyse-content font-var">
            <ReactMarkdown>{analyseData}</ReactMarkdown>
          </div>
        ) : (
          <p className="analyse-empty">No analysis available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Analyse;
