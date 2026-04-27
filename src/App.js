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
import Sidebar from "./components/sidebar/Sidebar";
import Fetcher from "./components/fetcher/Fetcher";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loader from "./common/Loader";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const activeComponent = useSelector((state) => state.activeComponent);
  // const journalLoader = useSelector((state) => state.getJournalLoader);

  console.log("active component is ", activeComponent);

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

  useEffect(() => {
    const handleKey = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.tagName === "SELECT"
      )
        return;
      if (e.key === "d" || e.key === "D") {
        dispatch({ type: "SET_JOURNAL_MODAL", payload: true });
      } else if(e.key === "Escape"){
        dispatch({ type: "SET_JOURNAL_MODAL", payload: false});
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId="267889382650-252ngh89pv148idna0ko9svm3hq2gamq.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                // Redirect or show dashboard (optional)
                <div className="dashboard-container ">
                  <Sidebar />
                  <div className="split">
                    <Navbar />
                    <Fetcher />
                    <JournalModal />


                    <Loader />
                    {/* <Entry /> */}


                    {activeComponent === "tradeCalendarComponent" ? (
                      <div>
                        <TradeCalendar />
                        <Cards />
                      </div>
                    ) : activeComponent === "tableComponent" ? (
                      <Table />
                    ) : activeComponent === "analyseComponent" ? (
                      <Analyse />
                    ) : (
                      <div>
                        <ScrollIndicator />
                      </div>
                    )}
                  </div>
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
    </GoogleOAuthProvider>
  );
};

export default App;
