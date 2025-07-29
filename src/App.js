import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Features from "./components/features/Features";
import ScrollIndicator from "./components/scrollIndicator/ScrollIndicator";
import Levelup from "./components/levelup/Levelup";
import Signup from "./auth/signup/Signup";
import Login from "./auth/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Entry from "./dashboard/entry/Entry";
import Table from "./dashboard/table/Table";
import JournalModal from "./dashboard/journalmodal/JournalModal";
import Analyse from "./dashboard/analyse/Analyse";
import TradeCalendar from "./dashboard/tradecalendar/TradeCalendar";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cards from "./dashboard/cards/Cards";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          console.log("Token is valid");
          // dispatch(setAuthenticated(true)); // if using Redux
          dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
        } else {
          console.log("Token expired");
          localStorage.removeItem("token");
          dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
        }
      } catch (err) {
        console.error("Invalid token", err);
        dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  console.log("isAuthenticated is ", isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              // Redirect or show dashboard (optional)
              <div className="dashboard-container">
                <Navbar />
                <ScrollIndicator />
                <TradeCalendar />
                <Cards />
                <Table />
                <Analyse />
                <JournalModal />
              </div>
            ) : (
              <div className="app">
                <Navbar />
                <Hero />
                <section id="features">
                  <Features />
                </section>
                <Levelup />
              </div>
            )
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
