import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Features from "./components/features/Features";
import ScrollIndicator from "./components/scrollIndicator/ScrollIndicator";
import Levelup from "./components/levelup/Levelup";
import Signup from "./auth/signup/Signup";
import Login from "./auth/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entry from "./dashboard/entry/Entry";
import Table from "./dashboard/table/Table";
import JournalModal from "./dashboard/journalmodal/JournalModal";
import Analyse from "./dashboard/analyse/Analyse";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <ScrollIndicator />
              <Navbar />
              <JournalModal />
              <Hero />
              <section id="features">
                <Features />
              </section>
              <Levelup />
            </div>
          }
        />

        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/entry" element={<Entry />} />
        <Route
          path="/auth/dashboard"
          element={
            <>
              <Table />
              <Analyse />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
