import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollIntoView from "react-scroll-into-view";
import "./Navbar.css";

const Navbar = () => {
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
            <span className="logo-text">TRADEPATH</span>
          </div>

          <ul className="navbar-menu font-var-2">
            <li className="active">Home</li>
            <ScrollIntoView selector="#features">
              <li>Features</li>
            </ScrollIntoView>
          </ul>

          <div className="navbar-actions">
            <button className="cta-btn font-var-2">Get Started Now</button>
          </div>

        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
