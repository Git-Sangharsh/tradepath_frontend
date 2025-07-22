import { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";

const Table = () => {
    const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "http://localhost:5000/api/journal/get-journal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJournals(res.data);
      } catch (err) {
        console.error("Error fetching journal data:", err);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div className="table-container">
      <h2>Trade Summary</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Direction</th>
            <th>Asset</th>
            <th>Session</th>
            <th>Result</th>
            <th>PnL ($)</th>
            <th>Confluences Used</th>
            <th>Emotions</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {journals.map((data, i) => (
            <tr key={i}>
              <td>
                {new Date(data.date).toLocaleDateString()} <br />
                {/* <small className="session-tag">{data.session}</small> */}
              </td>
              <td className={data.direction === "long" ? "long" : "short"}>
                {data.direction.toUpperCase()}
              </td>
              <td>{data.asset}</td>
              <td>{data.session}</td>
              <td>
                <span className={`status-badge status-${data.result}`}>
                  {data.result.toUpperCase()}
                </span>
              </td>
              <td className={data.pnl >= 0 ? "win" : "loss"}>${data.pnl}</td>
              <td className="confluences-cell">
                {data.confluences_used.map((item, index) => (
                  <span
                    key={index}
                    className={`confluence-tag tag-${index % 8}`}
                  >
                    {item}
                  </span>
                ))}
              </td>
              <td>
                <span
                  className={`status-badge status-${data.emotions.toLowerCase()}`}
                >
                  {data.emotions}
                </span>
              </td>
              <td className="comment-cell" title={data.comments}>
                {data.comments}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
