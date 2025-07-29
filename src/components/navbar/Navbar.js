import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import ScrollIntoView from "react-scroll-into-view";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  // console.log(isAuthenticated, "is authenticated is ");

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only hide after scrolling a bit
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const AuthRoute = () => {
    navigate("/auth/login");
  };

  const handleLogout = () => {
    dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
    navigate("/auth/login");
  };

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="navbar"
        >
          <div className="navbar-logo">
            {/* <span className="logo-text">TRADEPATH</span> */}
            <span className="logo-text">TRADESENSE</span>
            {/* <button
              onClick={() =>
                dispatch({ type: "TOGGLE_JOURNAL_MODAL", payload: true })
              }
            >
              Add Journal Entry
            </button> */}
          </div>
          {/*
          <ul className="navbar-menu font-var-2">
            <li className="active">Home</li>
            <ScrollIntoView selector="#features">
              <li>Features</li>
            </ScrollIntoView>
          </ul> */}

          <div className="navbar-actions">
            {isAuthenticated ? (
              <button className="cta-btn font-var-2" onClick={handleLogout}>
                LOG OUT
              </button>
            ) : (
              <button className="cta-btn font-var-2" onClick={AuthRoute}>
                Get Started Now
              </button>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
