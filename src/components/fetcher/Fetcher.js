import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Fetcher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJournal = async () => {
      const token = localStorage.getItem("token");

      try {
        // start of getJournalLoader
        dispatch({type: "SET_GET_JOURNAL_LOADER", payload: true})
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/journal/get-journal`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch({ type: "SET_ANALYSE_DATA", payload: res.data.analysis });
        dispatch({ type: "SET_JOURNAL_DATA", payload: res.data.entries });
        dispatch({ type: "SET_FETCHER_DATA", payload: res.data})


        // console.log("data is fetch from the fetcher ", res.data);
      } catch (err) {
        console.error("error fetching data ", err);
      } finally{
        dispatch({type: "SET_GET_JOURNAL_LOADER", payload: false})
      }
    };

    fetchJournal();
  }, [dispatch]);
  return null;
};

export default Fetcher;
