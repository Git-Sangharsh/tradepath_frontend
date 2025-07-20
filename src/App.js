import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Features from "./components/features/Features";
import ScrollIndicator from "./components/scrollIndicator/ScrollIndicator";
import Levelup from "./components/levelup/Levelup";
import Signup from "./auth/signup/Signup";
import Login from "./auth/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      </Routes>
    </Router>
  );
};

export default App;
