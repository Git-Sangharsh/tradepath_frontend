import { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";
import { useDispatch} from "react-redux";

const Table = () => {
  const dispatch = useDispatch();
  // const journalData = useSelector(state => state.journalData)
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
        setJournals(res.data.entries);
        // console.log(res.data.entries);

        dispatch({ type: "SET_ANALYSE_DATA", payload: res.data.analysis });
        dispatch({type: "SET_JOURNAL_DATA", payload: res.data.entries});
      } catch (err) {
        console.error("Error fetching journal data:", err);
      }
    };

    fetchJournals();
  }, [dispatch]);

  // console.log(journalData)

  return (
    <div className="table-container">
      {/* <h2>Trade Summary</h2> */}
      <table className="custom-table">
        <thead>
          <tr>
            <th className="font-var">Date</th>
            <th className="font-var">Direction</th>
            <th className="font-var">Asset</th>
            <th className="font-var">Session</th>
            <th className="font-var">Result</th>
            <th className="font-var">PnL ($)</th>
            <th className="font-var">Confluences Used</th>
            <th className="font-var">Setups</th>
            <th className="font-var">Comments</th>
          </tr>
        </thead>
        <tbody>
          {journals.map((data, i) => (
            <tr key={i}>
              <td className="font-var">
                {new Date(data.date).toLocaleDateString()} <br />
                {/* <small className="session-tag">{data.session}</small> */}
              </td>
              <td
                className={
                  data.direction === "long" ? "long font-var" : "short font-var"
                }
              >
                {data.direction.toUpperCase()}
              </td>
              <td className="font-var">{data.asset}</td>
              <td className="font-var">{data.session}</td>
              <td>
                <span className={`status-badge font-var status-${data.result}`}>
                  {data.result.toUpperCase()}
                </span>
              </td>
              <td className={data.pnl >= 0 ? "win font-var" : "loss font-var"}>
                ${data.pnl}
              </td>
              <td className="confluences-cell font-var">
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
                  // className={`status-badge font-var status-${data.setups.toLowerCase()}`}
                  className={`status-badge font-var status-${data.setups}`}
                >
                  {data.setups}
                </span>
              </td>
              <td className="comment-cell font-var" title={data.comments}>
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
